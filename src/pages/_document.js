import { Children } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from 'src/utils/create-emotion-cache';

// Component for adding favicon links
const Favicon = () => { /* ... */ };

// Component for adding font links
const Fonts = () => { /* ... */ };

/**
 * CustomDocument component is used to customize the HTML document structure
 * rendered by Next.js. It allows adding custom <head> and <body> elements.
 */
class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add favicon links */}
          <Favicon />
          {/* Add font links */}
          <Fonts />
        </Head>
        <body>
          {/* Render main content */}
          <Main />
          {/* Render Next.js script */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

/**
 * Static method to retrieve initial props for server-side rendering.
 * This method extracts Emotion CSS styles and adds them to the rendered page.
 */
CustomDocument.getInitialProps = async (ctx) => {
  // Original renderPage method from Next.js
  const originalRenderPage = ctx.renderPage;
  // Create Emotion cache
  const cache = createEmotionCache();
  // Create Emotion server instance to extract CSS styles
  const { extractCriticalToChunks } = createEmotionServer(cache);

  // Replace renderPage method to use Emotion cache
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => (
      <App
        emotionCache={cache}
        {...props}
      />
    )
  });

  // Get initial props from the default Document component
  const initialProps = await Document.getInitialProps(ctx);
  // Extract Emotion CSS styles
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  // Generate Emotion style tags
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  // Return initial props along with Emotion style tags
  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  };
};

export default CustomDocument;
