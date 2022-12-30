import React, { FC } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "../components/layout/NextNProgress";

import "@fontsource/roboto-mono";
import theme from "../theme/theme";

export type CustomPageProps = {
  hideHeader?: boolean;
  global?: any;
  story?: any;
};

/**
 * Renders the myapp
 * @param {NextComponentType<NextPageContext, any, {}>} Component
 * @param {any} pageProps
 * @return {ReactElement}
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>

      <NextNProgress />
      <Component {...pageProps} />
    </ChakraProvider >
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
