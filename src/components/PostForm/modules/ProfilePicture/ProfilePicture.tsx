import React from 'react';
import styles from './ProfilePicture.module.scss';

type ProfilePictureProps = {
  onRef: React.RefObject<HTMLInputElement>;
  error?: string[];
};

type ProfilePictureState = {
  image: string;
};

class ProfilePicture extends React.Component<ProfilePictureProps, ProfilePictureState> {
  state = {
    image: '',
  };

  uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      this.setState({ image });
    }
  };

  render() {
    return (
      <div className={styles.profilePicture}>
        <label htmlFor="profilePicture-upload" className={styles.profilePicture__label}>
          <div className={styles.profilePicture__preview}>
            {this.state.image ? (
              <img
                className={styles.profilePicture__image}
                src={this.state.image}
                alt="Preview image"
              />
            ) : (
              <p className={styles.profilePicture__title}>
                {this.props.error?.length ? (
                  <>
                    <span className={styles.profilePicture__title_error}>Upload an image</span>
                  </>
                ) : (
                  <>No image</>
                )}
              </p>
            )}
          </div>
        </label>
        <input
          type="file"
          id="profilePicture-upload"
          accept="image/png, image/gif, image/jpeg"
          onChange={this.uploadImage}
          ref={this.props.onRef}
          hidden
        />
      </div>
    );
  }
}

export default ProfilePicture;
