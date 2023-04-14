import React from 'react';
import styles from './RootLayout.module.scss';
import Header from '../components/Header/Header';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { routes } from '../App';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname || route.path === '*') ?? {};

  return (
    <>
      <Header />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          timeout={300}
          unmountOnExit
        >
          <main data-testid="outlet" ref={nodeRef}>
            {currentOutlet}
          </main>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default RootLayout;
