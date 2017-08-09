import { createElement } from 'react';
import { style } from 'typestyle';

const socialIconClass = style({
  marginRight: 10,
  display: 'inline-block'
});

export const Mail = () =>
  <div className={socialIconClass}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <path d="M14 5.547v6.203q0 0.516-0.367 0.883t-0.883 0.367h-11.5q-0.516 0-0.883-0.367t-0.367-0.883v-6.203q0.344 0.383 0.789 0.68 2.828 1.922 3.883 2.695 0.445 0.328 0.723 0.512t0.738 0.375 0.859 0.191h0.016q0.398 0 0.859-0.191t0.738-0.375 0.723-0.512q1.328-0.961 3.891-2.695 0.445-0.305 0.781-0.68zM14 3.25q0 0.617-0.383 1.18t-0.953 0.961q-2.937 2.039-3.656 2.539-0.078 0.055-0.332 0.238t-0.422 0.297-0.406 0.254-0.449 0.211-0.391 0.070h-0.016q-0.18 0-0.391-0.070t-0.449-0.211-0.406-0.254-0.422-0.297-0.332-0.238q-0.711-0.5-2.047-1.426t-1.602-1.113q-0.484-0.328-0.914-0.902t-0.43-1.066q0-0.609 0.324-1.016t0.926-0.406h11.5q0.508 0 0.879 0.367t0.371 0.883z" />
    </svg>
  </div>;

export const Twitter = () =>
  <div className={socialIconClass}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="14"
      viewBox="0 0 13 14"
    >
      <path d="M12.656 3.188q-0.523 0.766-1.266 1.305 0.008 0.109 0.008 0.328 0 1.016-0.297 2.027t-0.902 1.941-1.441 1.645-2.016 1.141-2.523 0.426q-2.117 0-3.875-1.133 0.273 0.031 0.609 0.031 1.758 0 3.133-1.078-0.82-0.016-1.469-0.504t-0.891-1.246q0.258 0.039 0.477 0.039 0.336 0 0.664-0.086-0.875-0.18-1.449-0.871t-0.574-1.605v-0.031q0.531 0.297 1.141 0.32-0.516-0.344-0.82-0.898t-0.305-1.203q0-0.688 0.344-1.273 0.945 1.164 2.301 1.863t2.902 0.777q-0.062-0.297-0.062-0.578 0-1.047 0.738-1.785t1.785-0.738q1.094 0 1.844 0.797 0.852-0.164 1.602-0.609-0.289 0.898-1.109 1.391 0.727-0.078 1.453-0.391z" />
    </svg>
  </div>;

export const Facebook = () =>
  <div className={socialIconClass}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      viewBox="0 0 12 14"
    >
      <path d="M11.336 1q0.273 0 0.469 0.195t0.195 0.469v10.672q0 0.273-0.195 0.469t-0.469 0.195h-3.055v-4.648h1.555l0.234-1.812h-1.789v-1.156q0-0.438 0.184-0.656t0.715-0.219l0.953-0.008v-1.617q-0.492-0.070-1.391-0.070-1.062 0-1.699 0.625t-0.637 1.766v1.336h-1.563v1.812h1.563v4.648h-5.742q-0.273 0-0.469-0.195t-0.195-0.469v-10.672q0-0.273 0.195-0.469t0.469-0.195h10.672z" />
    </svg>
  </div>;

export const Info = () =>
  <div className={socialIconClass}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      viewBox="0 0 12 14"
    >
      <path d="M8 10.75v-1.25q0-0.109-0.070-0.18t-0.18-0.070h-0.75v-4q0-0.109-0.070-0.18t-0.18-0.070h-2.5q-0.109 0-0.18 0.070t-0.070 0.18v1.25q0 0.109 0.070 0.18t0.18 0.070h0.75v2.5h-0.75q-0.109 0-0.18 0.070t-0.070 0.18v1.25q0 0.109 0.070 0.18t0.18 0.070h3.5q0.109 0 0.18-0.070t0.070-0.18zM7 3.75v-1.25q0-0.109-0.070-0.18t-0.18-0.070h-1.5q-0.109 0-0.18 0.070t-0.070 0.18v1.25q0 0.109 0.070 0.18t0.18 0.070h1.5q0.109 0 0.18-0.070t0.070-0.18zM12 7q0 1.633-0.805 3.012t-2.184 2.184-3.012 0.805-3.012-0.805-2.184-2.184-0.805-3.012 0.805-3.012 2.184-2.184 3.012-0.805 3.012 0.805 2.184 2.184 0.805 3.012z" />
    </svg>
  </div>;