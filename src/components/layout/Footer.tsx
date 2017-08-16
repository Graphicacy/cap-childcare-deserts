import { createElement } from 'react';
import { style, media } from 'typestyle';
import { Colors } from '../colors';

const FOOTER_HEIGHT = 50;
const FOOTER_PADDING = 20;

const footerClass = style({
  display: 'block',
  padding: FOOTER_PADDING,
  minHeight: FOOTER_HEIGHT + FOOTER_PADDING * 2,
  color: Colors.FONT_GRAY,
  backgroundColor: Colors.GRAY,
  $nest: {
    '& a': {
      color: Colors.FONT_GRAY
    },
    '& a:not(:last-child)': {
      marginRight: '1rem'
    }
  }
});

const imageClass = style(
  {
    float: 'right',
    height: FOOTER_HEIGHT,
    width: FOOTER_HEIGHT,
    marginLeft: '20px'
  },
  media(
    { maxWidth: 768 },
    {
      display: 'none'
    }
  )
);

export const Footer = () =>
  <div className={footerClass}>
    <footer>
      <img
        src={require('../../../images/ho_CAPlogo.png')}
        className={imageClass}
      />
      <div style={{ float: 'right', textAlign: 'right' }}>
        <small>
          © 2017 Center for American Progress <br />
          <a href="https://www.americanprogress.org/about/contact-us/">
            Contact Us
          </a>
          <a href="https://www.americanprogress.org/about/c3-terms/">
            Terms of Use
          </a>
          <a href="https://www.americanprogress.org/about/c3-privacy-policy/">
            Privacy Policy
          </a>
          <a href="https://www.americanprogress.org/about/c3-reuse-policy/">
            Reuse Policy
          </a>
        </small>
      </div>
    </footer>
  </div>;

export default Footer;
