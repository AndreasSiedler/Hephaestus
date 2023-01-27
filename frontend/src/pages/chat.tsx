import { Container } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatContainer from "../components/Chat/index";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

export default function Chat() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user && router.query.conversationId) {
      router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
    }
  }, [session?.user, router.query]);

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      {session && session.user.username && <ChatContainer session={session} />}
    </Layout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
