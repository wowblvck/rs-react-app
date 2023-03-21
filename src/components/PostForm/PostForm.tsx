import React from 'react';
import styles from './PostForm.module.scss';
import classNames from 'classnames';
import { CountriesInfo } from 'interfaces/Countries.interface';
import Dropdown from '../Dropdown/Dropdown';
import ImageUpload from '../ImageUpload/ImageUpload';

type PostFormState = {
  image: string;
  countries: CountriesInfo[];
};

const fetchCountries = async (): Promise<CountriesInfo[]> => {
  try {
    const response = await fetch('/countries.json');
    return await response.json();
  } catch (e) {
    throw new Error(`Error while loading database: ${e}`);
  }
};

export default class PostForm extends React.Component<object, PostFormState> {
  state = {
    image: '',
    countries: [],
  };

  private dropdownList: React.RefObject<HTMLSelectElement> = React.createRef();
  private uploadImage: React.RefObject<HTMLInputElement> = React.createRef();

  handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = this.uploadImage.current?.files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      this.setState({ image });
    }
  };

  componentDidMount = async () => {
    const countries = await fetchCountries();
    this.setState({ countries });
  };

  render() {
    return (
      <section className={styles.postForm}>
        <div className={styles.container}>
          <h2 className={styles.postForm__title}>Create a post ✏️</h2>
          <form className={styles.formContent} onSubmit={this.handleForm}>
            <ImageUpload imageFileRef={this.uploadImage} />
            <div className={styles.formWrapper}>
              <div className={styles.formWrapper__element}>
                <p>Name of place</p>
                <input type="text" className={styles.textInput} />
              </div>
              <div className={styles.formWrapper__element}>
                <p>Description</p>
                <textarea className={classNames(styles.textInput, styles.textInput_area)} />
              </div>
              <div className={styles.formWrapper__element}>
                <Dropdown items={this.state.countries} dropdownRef={this.dropdownList} />
              </div>
            </div>
            {/*<input type="submit" />*/}
          </form>
        </div>
      </section>
    );
  }
}
