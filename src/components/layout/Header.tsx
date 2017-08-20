import { content } from 'csstips';
import { createElement } from 'react';
import { connect } from 'react-redux';
import { media, style } from 'typestyle';

import { Colors } from '../colors';
import ArticleFocusButton from './ArticleFocusButton';
import { Facebook, Info, Mail, Twitter } from './Icons';
import { Logo } from './Logo';

export const HEADER_HEIGHT = 64;

const headerClass = style({
  position: 'fixed',
  width: '100%',
  height: HEADER_HEIGHT,
  backgroundColor: 'white',
  boxShadow: '0 3px 2px 0px #888;',
  padding: '10px 20px 10px 20px',
  zIndex: 3
});

const logoClass = style({
  display: 'inline-block',
  marginLeft: 20,
  marginTop: -10
});

const textLinkClass = style({
  float: 'right',
  marginTop: 10
});

const anchorClass = style(
  {
    marginRight: 10,
    fontSize: '14px',
    color: Colors.HEADER_GRAY,
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        color: Colors.HEADER_GRAY,
        textDecoration: 'underline'
      }
    },
    textDecoration: 'none'
  },
  media({ maxWidth: 835 }, { display: 'none' })
);

const socialClass = style({
  float: 'right',
  marginTop: 10
});

const Header = () =>
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
      <a className={anchorClass} href="#" target="_blank">
        Download the Report <Info />
      </a>
      <ArticleFocusButton className={anchorClass} />
    </div>
  </div>;

export default Header;
