import { createElement } from 'react';
import { style } from 'typestyle';

const socialIconClass = style({
  marginRight: 10,
  display: 'inline-block'
});

export const Mail = () =>
  <div className={socialIconClass}>
    <svg
      id="i-mail"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      fill="none"
      stroke="currentcolor"
      strokeWidth="2"
    >
      <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6" />
    </svg>
  </div>;

export const Twitter = () =>
  <div className={socialIconClass}>
    <svg id="i-twitter" viewBox="0 0 64 64" width="16" height="16">
      <path
        strokeWidth="0"
        fill="currentColor"
        d="M60 16 L54 17 L58 12 L51 14 C42 4 28 15 32 24 C16 24 8 12 8 12 C8 12 2 21 12 28 L6 26 C6 32 10 36 17 38 L10 38 C14 46 21 46 21 46 C21 46 15 51 4 51 C37 67 57 37 54 21 Z"
      />
    </svg>
  </div>;

export const Facebook = () =>
  <div className={socialIconClass}>
    <svg viewBox="0 0 16 16" width="16" height="16">
      <path d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.48-1.195 1.18v1.54h2.39l-.31 2.42h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0" />
    </svg>
  </div>;

export const Info = () =>
  <div className={socialIconClass}>
    <svg
      id="i-info"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      fill="none"
      stroke="currentcolor"
      strokeWidth="2"
    >
      <path d="M16 14 L16 23 M16 8 L16 10" />
      <circle cx="16" cy="16" r="14" />
    </svg>
  </div>;
