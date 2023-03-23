import React from 'react';
import styles from './PostForm.module.scss';
import effects from '../../scss/common/Effects.module.scss';
import {
  Dropdown,
  ImageUpload,
  DatePicker,
  FormText,
  RadioForm,
  CheckboxForm,
  ProfilePicture,
} from './modules';
import classNames from 'classnames';
import { PlacesInfo, CountriesInfo, FormRefs } from '../../interfaces/index';

type PostFormProps = {
  onSubmit: (formData: PlacesInfo | null) => void;
};

type PostFormState = {
  image: string;
  countries: CountriesInfo[];
  formData: PlacesInfo | null;
};

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];
const rules = [
  'I accept the terms of posting',
  'I consent to the publication of my name and surname',
];

const fetchCountries = async (): Promise<CountriesInfo[]> => {
  try {
    const response = await fetch('/countries.json');
    return await response.json();
  } catch (e) {
    throw new Error(`Error while loading database: ${e}`);
  }
};

export default class PostForm extends React.Component<PostFormProps, PostFormState> {
  state = {
    image: '',
    countries: [],
    formData: null,
  };

  private formRefs: FormRefs = {
    dropdownList: React.createRef(),
    uploadImage: React.createRef(),
    datePicker: React.createRef(),
    place: React.createRef(),
    description: React.createRef(),
    profilePicture: React.createRef(),
    firstName: React.createRef(),
    lastName: React.createRef(),
    categories: [],
    rules: [],
  };

  setCategoriesRef = (ref: HTMLInputElement) => {
    this.formRefs.categories.push(ref);
  };

  setRulesRef = (ref: HTMLInputElement) => {
    this.formRefs.rules.push(ref);
  };

  handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <div className={styles.formContainer}>
              <ImageUpload imageFileRef={this.formRefs.uploadImage} />
              <div className={styles.formWrapper}>
                <FormText textInputRef={this.formRefs.place}>Name of place</FormText>
                <FormText textInputRef={this.formRefs.description} area>
                  Description
                </FormText>
                <Dropdown items={this.state.countries} dropdownRef={this.formRefs.dropdownList} />
                <DatePicker datePickerRef={this.formRefs.datePicker}>Date</DatePicker>
                <RadioForm name="category" items={categories} ref={this.setCategoriesRef} />
                <ProfilePicture onRef={this.formRefs.profilePicture} />
                <FormText textInputRef={this.formRefs.firstName}>Your name</FormText>
                <FormText textInputRef={this.formRefs.lastName}>Your surname</FormText>
                <CheckboxForm name="rules" items={rules} ref={this.setRulesRef} />
              </div>
            </div>
            <button type="submit" className={classNames(styles.formButton, effects.buttonShadow)}>
              Add Post
            </button>
          </form>
        </div>
      </section>
    );
  }
}
