import * as React from 'react';

const EuiIconAppSql = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M18 6h9v2h-9zM5 6h9v2H5zM5 12h9v2H5zM18 12h9v2h-9zM5 18h9v2H5zM18 18h9v2h-9zM18 24h9v2h-9zM5 24h9v2H5z"
    />
    <path d="M29 32H3a3 3 0 01-3-3V3a3 3 0 013-3h26a3 3 0 013 3v26a3 3 0 01-3 3zM3 2a1 1 0 00-1 1v26a1 1 0 001 1h26a1 1 0 001-1V3a1 1 0 00-1-1H3z" />
  </svg>
);

export const icon = EuiIconAppSql;
