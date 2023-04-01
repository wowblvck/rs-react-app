import React, { useEffect, useState } from 'react';
import styles from './ProfilePicture.module.scss';
import effects from '../../../../scss/common/Effects.module.scss';
import classNames from 'classnames';
import { FieldError, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../../../../types';

type ProfilePictureProps = {
  register: UseFormRegister<FormValues>;
  name: Path<FormValues>;
  error?: FieldError | undefined;
  setValue: UseFormSetValue<FormValues>;
  reset: boolean;
};

const ProfilePicture = ({ error, register, name, setValue, reset }: ProfilePictureProps) => {
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
    <div className={styles.profilePicture}>
      <label htmlFor="profilePicture-upload" className={styles.profilePicture__label}>
        <div className={classNames(styles.profilePicture__preview, effects.boxShadow)}>
          {image && !error ? (
            <img className={styles.profilePicture__image} src={image} alt="Preview image" />
          ) : (
            <p className={styles.profilePicture__title}>
              {error ? (
                <>
                  <span className={styles.profilePicture__title_error}>{error.message}</span>
                </>
              ) : (
                <>No image</>
              )}
            </p>
          )}
        </div>
      </label>
      <input
        aria-label={name}
        type="file"
        id="profilePicture-upload"
        {...register(name)}
        accept="image/png, image/gif, image/jpeg"
        onChange={imageUpload}
        hidden
      />
    </div>
  );
};

export default ProfilePicture;
