import React, { LegacyRef } from 'react';
import styles from './FormRadio.module.scss';

type FormRadioProps = {
  items: Array<string>;
  name: string;
};

export const RadioForm = React.forwardRef(
  (props: FormRadioProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
    <ul className={styles.formList}>
      {props.items.map((item, index) => (
        <li key={`${item}-${index}`} className={styles.formList__item}>
          <label className={styles.formList__label}>
            <input
              type="radio"
              name={props.name}
              value={item}
              ref={ref}
              defaultChecked={index === 0 ? true : undefined}
            />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  )
);
