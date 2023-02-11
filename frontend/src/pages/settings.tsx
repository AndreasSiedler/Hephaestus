import { getSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import Layout from "../components/layout/Layout";
import Settings from "../components/Settings";

const SettingsPage: React.FC = () => {
  return (
    <Layout title="User settings">
      <Settings />
    </Layout>
  );
};

export default SettingsPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
