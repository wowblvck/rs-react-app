import React, { LegacyRef } from 'react';
import styles from './FormRadio.module.scss';
import FormError from '../../FormError/FormError';

type FormRadioProps = {
  items: Array<string>;
  name: string;
  error: string[];
};

const RadioForm = React.forwardRef(
  (props: FormRadioProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
    <div>
      <ul className={styles.formList}>
        {props.items.map((item, index) => (
          <li key={`${item}-${index}`} className={styles.formList__item}>
            <label className={styles.formList__label}>
              <input type="radio" name={props.name} value={item} ref={ref} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      {props.error !== undefined && <FormError error={props.error} />}
    </div>
  )
);

export default RadioForm;
