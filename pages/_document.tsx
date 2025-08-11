import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <a href="#main" className="skip-link">Skip to main content</a>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;


