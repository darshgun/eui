import * as React from 'react';

const EuiIconLayers = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.276 1.053a.5.5 0 01.448 0l6 3a.5.5 0 010 .894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 010-.894l6-3zM2.618 4.5L7.5 6.941 12.382 4.5 7.5 2.059 2.618 4.5z" />
    <path d="M1.053 7.276a.5.5 0 01.67-.223L7.5 9.94l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" />
    <path d="M1.724 10.053a.5.5 0 10-.448.894l6 3a.5.5 0 00.448 0l6-3a.5.5 0 10-.448-.894L7.5 12.94l-5.776-2.888z" />
  </svg>
);

export const icon = EuiIconLayers;
