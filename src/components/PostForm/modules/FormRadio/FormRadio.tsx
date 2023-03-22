import React, { LegacyRef } from 'react';
import styles from './FormRadio.module.scss';

type FormRadioProps = {
  items: Array<string>;
};

// type radioButtonProps = {
//   index: number;
//   value: string;
// };

// const RadioButton = React.forwardRef(
//   (props: radioButtonProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
//     <input
//       type="radio"
//       ref={ref}
//       name="category"
//       value={props.value}
//       defaultChecked={props.index === 0 ? true : undefined}
//     />
//   )
// );

// export default class FormRadio extends React.Component<FormRadioProps> {
//   inputRefs = [];

//   setRef = (ref: never) => {
//     this.inputRefs.push(ref);
//   };

//   render() {
//     const { items } = this.props;

//     return (
//       <ul className={styles.formList}>
//         {items.map((item, index) => (
//           <li key={`${item}-${index}`} className={styles.formList__item}>
//             <label className={styles.formList__label}>
//               <span>{item}</span>
//               <RadioButton value={item} index={index} ref={this.setRef} />
//               {/* <input
//                 type="radio"
//                 name="category"
//                 value={item}
//                 defaultChecked={index === 0 ? true : undefined}
//               /> */}
//             </label>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

export const RadioForm = React.forwardRef(
  (props: FormRadioProps, ref: LegacyRef<HTMLInputElement> | undefined) => (
    <ul className={styles.formList}>
      {props.items.map((item, index) => (
        <li key={`${item}-${index}`} className={styles.formList__item}>
          <label className={styles.formList__label}>
            <span>{item}</span>
            <input
              type="radio"
              name="category"
              value={item}
              ref={ref}
              defaultChecked={index === 0 ? true : undefined}
            />
          </label>
        </li>
      ))}
    </ul>
  )
);
