import React from 'react';
import styles from './PostForm.module.scss';
import { CountriesInfo } from 'interfaces/Countries.interface';
import {
  Dropdown,
  ImageUpload,
  DatePicker,
  FormText,
  RadioForm,
  CheckboxForm,
  ProfilePicture,
} from './modules';

type PostFormState = {
  image: string;
  countries: CountriesInfo[];
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
  private categoryRefs: HTMLInputElement[] = [];
  private profilePicture: React.RefObject<HTMLInputElement> = React.createRef();
  private firstName: React.RefObject<HTMLInputElement> = React.createRef();
  private lastName: React.RefObject<HTMLInputElement> = React.createRef();
  private rulesRefs: HTMLInputElement[] = [];

  setRadioRef = (ref: HTMLInputElement) => {
    this.categoryRefs.push(ref);
  };

  setCheckboxRef = (ref: HTMLInputElement) => {
    this.rulesRefs.push(ref);
  };

  handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const file = this.uploadImage.current?.files?.[0];
    // if (file) {
    //   const image = URL.createObjectURL(file);
    //   // this.setState({ image });
    // }
    //
    // const profileFile = this.profilePicture.current?.files?.[0];
    // if (profileFile) {
    //   const image = URL.createObjectURL(profileFile);
    // }

    // const item = this.categoryRefs.find((item: HTMLInputElement) => item.checked);
    // console.log(item?.value);

    // console.log(this.place.current?.value);
    // console.log(this.description.current?.value);
    //
    // console.log(this.firstName.current?.value);
    // console.log(this.lastName.current?.value);

    // const rule = this.rulesRefs.filter((item: HTMLInputElement) => item.checked);
    // console.log(rule.map((rule) => rule.value));
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
              <ImageUpload imageFileRef={this.uploadImage} />
              <div className={styles.formWrapper}>
                <FormText textInputRef={this.place}>Name of place</FormText>
                <FormText textInputRef={this.description} area>
                  Description
                </FormText>
                <Dropdown items={this.state.countries} dropdownRef={this.dropdownList} />
                <DatePicker datePickerRef={this.datePicker}>Date</DatePicker>
                <RadioForm name="category" items={categories} ref={this.setRadioRef} />
                <ProfilePicture onRef={this.profilePicture} />
                <FormText textInputRef={this.firstName}>Your name</FormText>
                <FormText textInputRef={this.lastName}>Your surname</FormText>
                <CheckboxForm name="rules" items={rules} ref={this.setCheckboxRef} />
              </div>
            </div>
            <input type="submit" style={{ marginTop: '20px' }} />
          </form>
        </div>
      </section>
    );
  }
}
