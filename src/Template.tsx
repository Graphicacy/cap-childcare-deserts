import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getStyles } from 'typestyle';

import * as styles from './components/styles';
import * as social from './social-content';

/**
 *
 * index.html template
 *
 */
export const Template = () =>
  <html>
    <head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content={[
          'width=device-width',
          'initial-scale=1',
          'maximum-scale=1',
          'user-scalable=0'
        ].join(', ')}
      />
      <meta property="fb:app_id" content="217056148424105" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={social.URL} />
      <meta property="og:title" content="Do you live in a Child Care Desert?" />
      <meta
        property="og:image"
        content="https://childcaredeserts.org/images/social_image.png"
      />
      <meta property="og:description" content={social.DESCRIPTION} />
      <meta property="og:site_name" content={social.TITLE} />
      <meta name="twitter:card" content="photo" />
      <meta name="twitter:title" content={social.TITLE} />
      <meta
        name="twitter:image:src"
        content="https://childcaredeserts.org/images/social_image.png"
      />
      <title>Do you live in a child care desert?</title>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto+Slab:700"
        rel="stylesheet"
      />
      <style>
        {`
          html {box-sizing: border-box;}
          *, *:before, *:after {box-sizing: inherit;}
        `}
      </style>
      <style id="styles-target">
        {Object.keys(styles).length ? getStyles() : ''}
      </style>
    </head>
    <body>
      <div id="root" />
    </body>
  </html>;

const markup = renderToStaticMarkup(<Template />);
export const templateContent = `<!DOCTYPE html>${markup}`;
