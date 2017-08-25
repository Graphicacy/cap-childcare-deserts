import { createElement } from 'react';
import { media, style } from 'typestyle';

const titleClass = style(
  {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    fontSize: 24,
    fontFamily: 'Roboto Slab',
    lineHeight: '1.5em'
  },
  media(
    { maxWidth: 768 },
    {
      lineHeight: '1.5em',
      marginBottom: 15
    }
  )
);

const Title: React.StatelessComponent = ({ children }) =>
  <div className={titleClass}>
    {children}
  </div>;

export default Title;
