import { content, fillParent, flex, vertical } from 'csstips';
import { media, style } from 'typestyle';
import { Colors } from '../colors';

export const ARTICLE_MAX_WIDTH = 750;

export const articleClass = style(content, {
  textAlign: 'left',
  maxWidth: ARTICLE_MAX_WIDTH,
  margin: '0 auto',
  lineHeight: '2em',
  $nest: {
    '& p': {
      lineHeight: '24px',
      fontSize: '14px'
    }
  }
});

export const anchorClass = style(
  {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    color: Colors.HEADER_GRAY
  },
  media(
    { minWidth: 789 },
    {
      display: 'none'
    }
  )
);

export const articleContainerClass = style(
  flex,
  {
    padding: 60,
    paddingTop: 0
  },
  media(
    { maxWidth: 768 },
    {
      padding: 30
    }
  )
);

export const stateBarChartClass = style(content, {
  maxWidth: 600,
  margin: '0 auto',
  textAlign: 'center'
});

export const ruleClass = style({
  width: '100%',
  maxWidth: ARTICLE_MAX_WIDTH,
  padding: 0,
  margin: '0 auto',
  marginBottom: 40
});

export const paragraphClass = style({
  marginTop: 0
});

export const bannerContainerClass = style(content, {
  padding: 40,
  paddingTop: 20,
  paddingBottom: 35,
});

export const bannerClassName = style({
  margin: '0 auto',
  maxWidth: 800,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  $nest: {
    '& p': {
      lineHeight: '24px',
      fontSize: 14,
      margin: '0px 0px 12px'
    }
  }
});

export const selectContainerClass = style({
    width: '100%'
  },
  media(
    { maxWidth: 780 },
    {
      order: -3,
      marginBottom: '15px'
    }
  )
);

export const desertPercentClass = style({
  color: Colors.ORANGE,
  marginRight: 5
});

/**
 * break between charts in columns and rows at 780px
 */
export const chartContainerClass = style(
  {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 40,
    paddingTop: 0,
    maxWidth: 1200,
    margin: '0 auto'
  },
  media(
    { maxWidth: 780 },
    {
      $nest: {
        '& div': {
          marginBottom: 10
        }
      }
    }
  )
);

export const chartClass = style({
  flexGrow: 1,
  // flexShrink: 0,
  flexBasis: 370,
  justifyContent: 'center'
});

export const contentClass = style(content);
export const contentContainerClass = style(fillParent, vertical);

export const containerClass = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  color: Colors.FONT_GRAY,
  fontFamily: 'Open Sans',
  fontSize: 14
});

export const FOOTER_HEIGHT = 50;
export const FOOTER_PADDING = 20;

export const footerClass = style({
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

export const imageClass = style(
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

export const linkContainerClass = style({ float: 'right', textAlign: 'right' });

export const HEADER_HEIGHT = 64;

export const headerClass = style({
  position: 'fixed',
  width: '100%',
  height: HEADER_HEIGHT,
  backgroundColor: 'white',
  boxShadow: '0 3px 2px 0px #888;',
  padding: '10px 20px 10px 20px',
  zIndex: 3
});

export const logoClass = style({
  display: 'inline-block',
  marginTop: -10
});

export const textLinkClass = style({
  float: 'right',
  marginTop: 10
});

export const headerAnchorClass = style(
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

export const socialClass = style({
  float: 'right',
  marginTop: 10
});

export const socialIconClass = style({
  marginRight: 10,
  display: 'inline-block',
  $nest: {
    '& svg': {
      fill: Colors.HEADER_GRAY
    }
  }
});

export const logoImageClass = style({
  width: 200,
  position: 'absolute',
  top: 5
});

export const supportMessageContainerClass = style({
  position: 'relative',
  width: '100%',
  height: 300
});

export const supportMessageClass = style({
  fontSize: 20,
  color: Colors.FONT_GRAY,
  lineHeight: '1.5em',
  textAlign: 'center',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
});

export const titleClass = style(
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
      lineHeight: '1.2em',
      marginBottom: 15
    }
  )
);
