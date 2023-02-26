import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { getSession } from "next-auth/react";
import { WebSocketServer } from "ws";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { GraphQLContext, Session, SubscriptionContext } from "./util/types";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

const PORT = process.env.PORT || 4000;
// const SESSION_SECRECT = process.env.SESSION_SECRER || "secret";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function main() {
  dotenv.config();

  const prisma = new PrismaClient();
  const pubsub = new PubSub();

  // Setup servers
  const app = express();
  const httpServer = http.createServer(app);

  // Setup express session
  // app.use(
  //   session({
  //     genid: (req) => uuid.v4(),
  //     secret: SESSION_SECRECT,
  //     resave: false,
  //     saveUninitialized: false,
  //   })
  // );

  // Setup passport session
  // app.use(passport.initialize());
  // app.use(passport.session());

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: SubscriptionContext) => {
        // ctx is the graphql-ws Context where connectionParams live
        if (ctx.connectionParams && ctx.connectionParams.session) {
          console.log("SERVER CONTEXT", ctx.connectionParams);

          const { session } = ctx.connectionParams;
          return { session, prisma, pubsub };
        }
        // Otherwise let our resolvers know we don't have a current user
        return { session: null, prisma, pubsub };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await getSession({ req });

        return { session: session as Session, prisma, pubsub };
      },
    })
  );

  // app.use("/auth", authRouter);

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server is now running on port ${PORT}`);
}

main().catch((err) => console.log(err));
