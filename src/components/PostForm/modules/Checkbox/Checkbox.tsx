import React, { LegacyRef } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  name: string;
  items: Array<string>;
};

const CheckboxForm = React.forwardRef(
  (props: CheckboxProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
    <ul className={styles.checkBox__list}>
      {props.items.map((item, index) => (
        <li key={`${item}-${index}`} className={styles.checkBox__item}>
          <label className={styles.checkBox__label}>
            {item}
            <input type="checkbox" name={props.name} value={item} ref={ref} />
            <span className={styles.checkBox__checkmark}></span>
          </label>
        </li>
      ))}
    </ul>
  )
);

export default CheckboxForm;
