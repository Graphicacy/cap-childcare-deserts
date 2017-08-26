import { createElement } from 'react';
import { connect } from 'react-redux';

import ArticleFocusButton from './ArticleFocusButton';
import { Facebook, Info, Mail, Twitter } from './Icons';
import { Logo } from './Logo';
import {
  headerAnchorClass,
  headerClass,
  logoClass,
  socialClass,
  textLinkClass
} from './styles';

const Header: React.StatelessComponent<{}> = () =>
  <div className={headerClass}>
    <div className={logoClass}>
      <a href="https://www.americanprogress.org/" target="__blank">
        <Logo />
      </a>
    </div>
    <div className={socialClass}>
      <Twitter />
      <Facebook />
      <Mail />
    </div>
    <div className={textLinkClass}>
      <a className={headerAnchorClass} href="#" target="_blank">
        Download the Report <Info />
      </a>
      <ArticleFocusButton className={headerAnchorClass} />
    </div>
  </div>;

export default Header;
