import React from 'react';

type RoutesProp = {
  path: string;
  name: string;
  element: React.ReactNode;
  nodeRef: React.RefObject<HTMLElement>;
  nav?: boolean;
};

export default RoutesProp;
