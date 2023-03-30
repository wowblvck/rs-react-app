import React, { useEffect, useState } from 'react';
import styles from './ImageUpload.module.scss';
import classNames from 'classnames';
import effects from '../../../../scss/common/Effects.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { UseFormRegister, Path, FieldError, UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../PostForm';

type ImageUploadProps = {
  register: UseFormRegister<FormValues>;
  name: Path<FormValues>;
  error?: FieldError | undefined;
  setValue: UseFormSetValue<FormValues>;
  reset: boolean;
};

const ImageUpload = ({ register, name, error, setValue, reset }: ImageUploadProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (reset) {
      setImage('');
    }
  }, [reset]);

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImage(image);
      setValue(name, file, { shouldValidate: true });
    }
  };

  return (
    <div className={styles.imageUploader}>
      <div className={classNames(styles.imageUploader__imageWrapper, effects.boxShadow)}>
        {image && !error ? (
          <img className={styles.imageUploader__image} src={image} alt="Preview image" />
        ) : (
          <p className={styles.imageUploader__title}>
            {error ? (
              <>
                <span className={styles.imageUploader__title_error}>{error.message}</span>
              </>
            ) : (
              <>
                Preview<span>261 x 164</span>
              </>
            )}
          </p>
        )}
      </div>
      <label className={classNames(styles.imageUploader__input, effects.buttonShadow)}>
        <FontAwesomeIcon icon={faCloudUpload} />
        Choose image
        <input
          type="file"
          {...register(name)}
          accept="image/png, image/gif, image/jpeg"
          onChange={imageUpload}
          hidden
        />
      </label>
    </div>
  );
};

export default ImageUpload;
