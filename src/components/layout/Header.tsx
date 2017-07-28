import { createElement } from 'react';
import { style, media } from 'typestyle';
import { content } from 'csstips';

import { Facebook, Twitter, Mail, Info } from './Icons';

const img: string = require('../../../images/cap-logo-small.png');

const headerHeight = 64;

const headerClass = style(content, {
  height: headerHeight,
  backgroundColor: 'white',
  boxShadow: '0 4px 2px 0px #ccc;',
  padding: '10px 20px 10px 20px',
  zIndex: 2
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
    color: 'black',
    $nest: {
      '&:hover': {
        color: 'black'
      }
    }
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
