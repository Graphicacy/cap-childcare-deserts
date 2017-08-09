import { createElement } from 'react';
import { style, media } from 'typestyle';
import { content } from 'csstips';

import { Colors } from '../colors';
import { Facebook, Twitter, Mail, Info } from './Icons';

const img: string = require('../../../images/cap-logo-small.png');

const headerHeight = 64;

const headerClass = style(content, {
  position: 'fixed',
  width: '100%',
  height: headerHeight,
  backgroundColor: 'white',
  boxShadow: '0 4px 2px 0px #ccc;',
  padding: '10px 20px 10px 20px',
  zIndex: 3
});

const logoClass = style({
  height: '100%'
});

const textLinkClass = style({
  textTransform: 'uppercase',
  float: 'right',
  marginTop: 10
});

const anchorClass = style(
  {
    marginRight: 10,
    color: Colors.HEADER_GRAY,
    $nest: {
      '&:hover': {
        color: Colors.HEADER_GRAY,
        textDecoration: 'underline'
      }
    },
    textDecoration: 'none'
  },
  media({ maxWidth: 772 }, { display: 'none' })
);

const socialClass = style({
  float: 'right',
  marginTop: 10
});

const Header = () =>
  <div className={headerClass}>
    <img src={img} className={logoClass} />
    <div className={socialClass}>
      <Twitter />
      <Facebook />
      <Mail />
    </div>
    <div className={textLinkClass}>
      <a className={anchorClass} href="#" target="_blank">
        download the report <Info />
      </a>
      <a className={anchorClass} href="#" target="_blank">
        about the data <Info />
      </a>
    </div>
  </div>;

export default Header;
