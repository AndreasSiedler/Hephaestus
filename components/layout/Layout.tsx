import { Box } from "@chakra-ui/react";
import Head from "next/head";

type LayoutProps = {
  children: any;
  title?: string;
};

const Layout = ({ children, title = "Book Best Hotels for your Holiday" }: LayoutProps) => {
  return (
    <Box bg="black" minH="100vH">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </Box>
  );
};

export default Layout;
