import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import Cors from "micro-cors";
import { PageConfig } from "next";
import { getSession } from "next-auth/react";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import prisma from "../../lib/prisma";
import { GraphQLContext } from "../../util/types";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  context: async ({ req, res }): Promise<GraphQLContext> => {
    const session = await getSession({ req });
    return { session, prisma };
  },
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
