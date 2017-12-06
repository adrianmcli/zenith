import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html,
  body {
    font-family: 'Open Sans', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en-US">
        <Head>
          <title>My page</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato|Open+Sans"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
