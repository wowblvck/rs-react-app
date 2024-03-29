import React from 'react';
import styles from '@/components/PostForm/FormError/FormError.module.scss';

type FormErrorProps = {
  children: React.ReactNode;
};

const FormError: React.FC<FormErrorProps> = ({ children }) => {
  return <p className={styles.error}>{children}</p>;
};

export default FormError;
