import React from 'react';
import styles from './ImageUpload.module.scss';
import classNames from 'classnames';
import effects from '../../../../scss/common/Effects.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

type ImageUploadProps = {
  imageFileRef: React.RefObject<HTMLInputElement>;
  error?: string[];
  reset: boolean;
};

type ImageUploadState = {
  image: string;
};

export default class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
  state = {
    image: '',
  };

  imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      this.setState({ image });
    }
  };

  componentDidUpdate(prevProps: ImageUploadProps) {
    if (prevProps.reset !== this.props.reset && this.props.reset) {
      this.setState({ image: '' });
    }
  }

  render() {
    const { error } = this.props;

    return (
      <div className={styles.imageUploader}>
        <div className={classNames(styles.imageUploader__imageWrapper, effects.boxShadow)}>
          {this.state.image ? (
            <img
              className={styles.imageUploader__image}
              src={this.state.image}
              alt="Preview image"
            />
          ) : (
            <p className={styles.imageUploader__title}>
              {error?.length ? (
                <>
                  <span className={styles.imageUploader__title_error}>Upload an image</span>
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
            accept="image/png, image/gif, image/jpeg"
            onChange={this.imageUpload}
            ref={this.props.imageFileRef}
            hidden
          />
        </label>
      </div>
    );
  }
}
