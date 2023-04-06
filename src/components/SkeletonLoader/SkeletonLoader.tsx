import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonPlaces = () => (
  <ContentLoader
    speed={2}
    width={261}
    height={306}
    viewBox="0 0 261 306"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="167" y="176" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="0" rx="12" ry="12" width="261" height="164" />
    <rect x="14" y="174" rx="0" ry="0" width="100" height="16" />
    <rect x="172" y="174" rx="0" ry="0" width="75" height="16" />
    <rect x="14" y="197" rx="0" ry="0" width="120" height="23" />
    <rect x="14" y="227" rx="0" ry="0" width="233" height="35" />
    <circle cx="31" cy="287" r="17" />
    <rect x="55" y="274" rx="0" ry="0" width="50" height="10" />
    <rect x="55" y="290" rx="0" ry="0" width="50" height="10" />
    <rect x="172" y="270" rx="0" ry="0" width="31" height="31" />
    <rect x="216" y="270" rx="0" ry="0" width="31" height="31" />
  </ContentLoader>
);

export default SkeletonPlaces;
