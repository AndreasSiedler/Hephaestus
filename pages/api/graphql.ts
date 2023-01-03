import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import { makeExecutableSchema } from "graphql-tools";
import { PageConfig } from "next";

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
