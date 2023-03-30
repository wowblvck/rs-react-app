import React from 'react';
import styles from './AboutContent.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import { randomBg } from '../../utils/bgRandomizer';
import classNames from 'classnames';
import githubLogo from '../../assets/icons/github_icon.svg';
import rsLogo from '../../assets/icons/rs-logo.png';

const AboutContent: React.FC = () => {
  return (
    <section className={styles.aboutContent} data-testid="about-content">
      <div className={styles.container}>
        <div className={styles.aboutContent__imageWrapper}>
          <img className={styles.aboutContent__image} src={randomBg()} alt="About image" />
        </div>
        <div className={styles.aboutContent__descriptionWrapper}>
          <h3 className={styles.aboutContent__title}>About Us 🫶</h3>
          <p className={styles.aboutContent__description}>
            We will tell and show you amazing and beautiful places located around the world. The
            service was created as part of the training of The Rolling Scopes School.
          </p>
          <p className={styles.aboutContent__contributors}>Contributors</p>
          <div className={styles.author}>
            <img className={styles.author__github} src={githubLogo} alt="Github logo" />
            <a
              className={classNames(styles.author__link, effects.linkHover)}
              href="https://github.com/wowblvck"
              target="_blank"
              rel="noreferrer"
            >
              wowblvck
            </a>
          </div>
          <div className={styles.school}>
            <img className={styles.school__logo} src={rsLogo} alt="School logo" />
            <a
              className={classNames(styles.school__link, effects.linkHover)}
              href="https://rs.school/"
              target="_blank"
              rel="noreferrer"
            >
              Rolling Scopes School
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
