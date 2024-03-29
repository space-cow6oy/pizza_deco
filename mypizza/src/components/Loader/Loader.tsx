import React from 'react';
import ContentLoader from 'react-content-loader';

export const Loader = (/*props*/) => (
  <ContentLoader
    speed={2}
    width={190}
    height={260}
    viewBox="0 0 190 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <circle cx="90" cy="95" r="85" />
    <rect x="0" y="200" rx="0" ry="0" width="190" height="60" />
  </ContentLoader>
);
