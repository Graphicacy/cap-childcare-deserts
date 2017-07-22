import * as React from 'react';
import { style, media } from 'typestyle';
import { Facebook, Twitter, Mail, Info } from './Icons';

const headerHeight = 64;

const headerClass = style({
  height: headerHeight,
  backgroundColor: 'white',
  boxShadow: '0 4px 2px 0px #ccc;'
});

const logoClass = style({
  height: '100%',
  marginLeft: 50
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
  marginRight: 40,
  marginTop: 10
});

export const Header = () =>
  <div className="columns col-gapless">
    <div className={`column col-12 ${headerClass}`}>
      <img src="images/cap-logo-fullcolor.png" className={logoClass} />
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
    </div>
  </div>;
