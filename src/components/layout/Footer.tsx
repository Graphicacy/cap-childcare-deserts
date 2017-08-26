import { createElement } from 'react';
import { footerClass, imageClass, linkContainerClass } from './styles';

const imgSrc = require('../../../images/ho_CAPlogo.png'); // tslint:disable-line

export const Footer: React.StatelessComponent<{}> = () =>
  <div className={footerClass}>
    <footer>
      <img src={imgSrc} className={imageClass} />
      <div className={linkContainerClass}>
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
