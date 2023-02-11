import httpServer from "./api/index";
import dotenv from "dotenv";

const main = async () => {
  dotenv.config();
  const PORT = 4000;

  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
};
main().catch((err) => console.log(err));
