import * as React from 'react';

const EuiIconUnfold = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.14 3.808L7.53 1.51a.67.67 0 01.942 0l2.389 2.298c.26.256.685.256.944 0a.65.65 0 000-.93L9.416.578a2.02 2.02 0 00-2.832 0l-2.388 2.3a.65.65 0 000 .93c.26.256.683.256.944 0zm0 8.384l2.39 2.298a.67.67 0 00.942 0l2.389-2.298a.677.677 0 01.944 0 .65.65 0 010 .93l-2.388 2.3a2.02 2.02 0 01-2.832 0l-2.388-2.3a.65.65 0 010-.93.677.677 0 01.944 0zM16 6H0v4h16V6zM1 9V7h14v2H1z" />
  </svg>
);

export const icon = EuiIconUnfold;
