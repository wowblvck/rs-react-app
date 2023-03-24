import React from 'react';
import styles from './FormError.module.scss';

type FormErrorProps = {
  error: string[];
};

class FormError extends React.Component<FormErrorProps> {
  render() {
    const { error } = this.props;

    return (
      <React.Fragment>
        {error.length > 0 && (
          <ul className={styles.errorList}>
            {error.map((error) => (
              <li key={error} className={styles.errorList__item}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default FormError;
