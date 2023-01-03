import React from "react";
// import Storyblok from "../config/storyblok-service";
import Layout from "../components/layout/Layout";
import { Container, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import prisma from "../lib/prisma";

interface HomeProps {
  story: any;
  preview: any;
}

/**
 * Renders index (home) page
 * @param {any} story
 * @param {any} preview
 * @return {ReactElement}
 */
export default function Home({ story, preview }: HomeProps) {
  // const enableBridge = true; // load the storyblok bridge everywhere
  // const enableBridge = preview; // enable bridge only in prevew mode

  // story = useStoryblok(story, enableBridge);
  const session = useSession();

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.2xl"} centerContent>
        <Heading>Juhu</Heading>
        {JSON.stringify(session)}
      </Container>
    </Layout>
  );
}

/**
 * Next.js will pre-render this page at build time using the props returned by
 * @param {boolean} preview
 * @return {Promise}
 */
export async function getStaticProps({ preview = false }) {
  // load the published content outside of the preview mode
  const accounts = await prisma.account.findMany();
  console.log(accounts);
  const nodeEnv = process.env.NODE_ENV;
  const sbParams = {
    version: nodeEnv === "production" ? "published" : "draft", // or 'published'
    cv: Date.now(),
  };

  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
  }

  // const { data: pages } = await Storyblok.get(`cdn/stories/home`, sbParams);
  // const { data: global } = await Storyblok.get(`cdn/stories/global`, sbParams);

  return {
    props: {
      // story: pages ? pages.story : null,
      // global: global ? global.story : null,
      preview,
    },
    revalidate: 30, // revalidate each 30 seconds
  };
}
