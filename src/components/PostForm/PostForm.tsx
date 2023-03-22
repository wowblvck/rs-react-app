import React from 'react';
import styles from './PostForm.module.scss';
import { CountriesInfo } from 'interfaces/Countries.interface';
import { Dropdown, ImageUpload, DatePicker, FormText } from './modules';
import { RadioForm } from './modules/FormRadio/FormRadio';

type PostFormState = {
  image: string;
  countries: CountriesInfo[];
};

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];

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
  private datePicker: React.RefObject<HTMLInputElement> = React.createRef();
  private place: React.RefObject<HTMLInputElement> = React.createRef();
  private description: React.RefObject<HTMLTextAreaElement> = React.createRef();
  private inputRefs: HTMLInputElement[] = [];

  setRef = (ref: never) => {
    this.inputRefs.push(ref);
  };

  handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = this.uploadImage.current?.files?.[0];
    if (file) {
      const image = URL.createObjectURL(file);
      this.setState({ image });
    }

    const item = this.inputRefs.find((item: HTMLInputElement) => item.checked === true);
    console.log(item?.value);
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
              <FormText textInputRef={this.place}>Name of place</FormText>
              <FormText textInputRef={this.description} area>
                Description
              </FormText>
              <Dropdown items={this.state.countries} dropdownRef={this.dropdownList} />
              <DatePicker datePickerRef={this.datePicker}>Date</DatePicker>
              <RadioForm items={categories} ref={this.setRef} />
            </div>
            <input type="submit" />
          </form>
        </div>
      </section>
    );
  }
}
