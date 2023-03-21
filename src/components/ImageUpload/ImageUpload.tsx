import React from 'react';
import styles from './ImageUpload.module.scss';
import classNames from 'classnames';
import effects from '../../scss/common/Effects.module.scss';

type ImageUploadProps = {
  // handleImageUpload: (loaded: boolean, src: string) => void;
  imageFileRef: React.RefObject<HTMLInputElement>;
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

  render() {
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
              Preview<span>261 x 164</span>
            </p>
          )}
        </div>
        <label className={classNames(styles.imageUploader__input, effects.buttonShadow)}>
          <i className="fa fa-cloud-upload"></i>
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
