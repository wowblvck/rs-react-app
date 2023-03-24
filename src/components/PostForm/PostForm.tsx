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
import { PlacesInfo, CountriesInfo, FormRefs, FormErrors } from '../../interfaces/index';
import { fetchCountries } from '../../thunks';
import moment from 'moment';
import PopupModal from '../PopupModal/PopupModal';

type PostFormProps = {
  onSubmit: (formData: PlacesInfo | null) => void;
};

type PostFormState = {
  countries: CountriesInfo[];
  formData: PlacesInfo | null;
  errors: FormErrors;
  isPopupVisible: boolean;
};

type ChangeFields<T, R> = Omit<T, keyof R> & R;
type FormData = ChangeFields<
  Omit<PlacesInfo, 'id'>,
  {
    author: Omit<PlacesInfo['author'], 'id'>;
  }
>;

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];
const rules = [
  'I accept the terms of posting',
  'I consent to the publication of my name and surname',
];

export default class PostForm extends React.Component<PostFormProps, PostFormState> {
  state: PostFormState = {
    countries: [],
    formData: null,
    errors: {
      location: [],
      description: [],
      date: [],
      category: [],
      firstName: [],
      lastName: [],
      rules: [],
      image: [],
      authorImage: [],
      country: [],
    },
    isPopupVisible: false,
  };

  private formRefs: FormRefs = {
    dropdownList: React.createRef(),
    uploadImage: React.createRef(),
    datePicker: React.createRef(),
    location: React.createRef(),
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

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupVisible: !prevState.isPopupVisible,
    }));
  };

  validateForm = (formData: FormData, rules: HTMLInputElement[]): FormErrors => {
    const errors: FormErrors = {
      location: [],
      description: [],
      date: [],
      category: [],
      firstName: [],
      lastName: [],
      rules: [],
      image: [],
      authorImage: [],
      country: [],
    };

    const { country, location, image, description, author, date, category } = formData;

    if (country.includes('none')) {
      errors.country.push('Select a value from the list');
    }

    if (!location) {
      errors.location.push('You must enter the name of the location');
    } else {
      if (location.length < 5 || location.length > 20) {
        errors.location.push('The length must be at least 5 and no more than 20 letters');
      }
      if (location.charAt(0) !== location.charAt(0).toUpperCase()) {
        errors.location.push('The name must start with a capital letter');
      }
    }

    if (!description) {
      errors.description.push('Description must be filled');
    } else {
      if (description.length < 5 || description.length > 300) {
        errors.description.push('The length must be at least 5 and no more than 30 letters');
      }
      if (description.charAt(0) !== description.charAt(0).toUpperCase()) {
        errors.description.push('The name must start with a capital letter');
      }
    }

    if (!date) {
      errors.date.push('Select post date');
    } else {
      const currentDate = moment();
      const specifiedDate = moment(date);
      if (specifiedDate.isAfter(currentDate)) {
        errors.date.push('Specified date is greater than the current date');
      }
    }

    if (!category) {
      errors.category.push('Select a category');
    }

    if (!author.first_name) {
      errors.firstName.push('You must enter the your name');
    } else {
      const words = author.first_name.split(' ');
      const hasMultipleWordsPerLine = words.length > 1;

      if (author.first_name.length < 2 || author.first_name.length > 25) {
        errors.firstName.push('The length must be at least 2 and no more than 25 letters');
      }
      if (author.first_name.charAt(0) !== author.first_name.charAt(0).toUpperCase()) {
        errors.firstName.push('The name must start with a capital letter');
      }
      if (hasMultipleWordsPerLine) {
        errors.firstName.push('There is only one word per line.');
      }
    }

    if (!author.last_name) {
      errors.lastName.push('You must enter the your surname');
    } else {
      const words = author.last_name.split(' ');
      const hasMultipleWordsPerLine = words.length > 1;

      if (author.last_name.length < 2 || author.last_name.length > 25) {
        errors.lastName.push('The length must be at least 2 and no more than 25 letters');
      }
      if (author.last_name.charAt(0) !== author.last_name.charAt(0).toUpperCase()) {
        errors.lastName.push('The surname must start with a capital letter');
      }
      if (hasMultipleWordsPerLine) {
        errors.lastName.push('There is only one word per line.');
      }
    }

    rules.forEach((rule) => {
      if (!rule.checked) {
        errors.rules.push(`You have not accepted the agreement: "${rule.value}"`);
      }
    });

    if (!image) {
      errors.image.push('Image not loaded');
    }

    if (!author.avatar.length) {
      errors.authorImage.push('Profile picture not loaded');
    }

    return errors;
  };

  handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uploadImage = this.formRefs.uploadImage.current?.files?.[0];
    const uploadImageURL = uploadImage ? URL.createObjectURL(uploadImage) : '';

    const profileImage = this.formRefs.profilePicture.current?.files?.[0];
    const profileImageURL = profileImage ? URL.createObjectURL(profileImage) : '';

    const category = this.formRefs.categories.find((category) => category.checked)?.value;

    const rules = this.formRefs.rules.map((rule) => rule);

    const formData: FormData = {
      country: this.formRefs.dropdownList.current?.value || '',
      location: this.formRefs.location.current?.value || '',
      image: uploadImageURL,
      category: category || '',
      description: this.formRefs.description.current?.value || '',
      date: this.formRefs.datePicker.current?.value || '',
      author: {
        avatar: profileImageURL,
        first_name: this.formRefs.firstName.current?.value.trim() || '',
        last_name: this.formRefs.lastName.current?.value.trim() || '',
      },
    };

    const errors = this.validateForm(formData, rules);
    this.setState({ errors });

    const emptyErrors = Object.values(errors).every((arr) => Array.isArray(arr) && !arr.length);

    if (emptyErrors) {
      const place = {
        ...formData,
        id: Math.floor(Math.random() * 100000),
        author: {
          ...formData.author,
          id: Math.floor(Math.random() * 100000),
        },
      } as PlacesInfo;
      this.props.onSubmit(place);
      this.setState({ isPopupVisible: true });
    }
  };

  componentDidMount = async () => {
    const countries = await fetchCountries();
    this.setState({ countries });
  };

  render() {
    const { errors, countries, isPopupVisible } = this.state;

    const {
      uploadImage,
      location,
      description,
      dropdownList,
      datePicker,
      profilePicture,
      firstName,
      lastName,
    } = this.formRefs;

    return (
      <section className={styles.postForm}>
        <div className={styles.container}>
          <h2 className={styles.postForm__title}>Create a post ✏️</h2>
          <form className={styles.formContent} onSubmit={this.handleForm}>
            <div className={styles.formContainer}>
              <ImageUpload imageFileRef={uploadImage} error={errors.image} />
              <div className={styles.formWrapper}>
                <FormText
                  textInputRef={location}
                  error={errors.location}
                  placeholder={'Ex: Central Garden'}
                >
                  Name of location
                </FormText>
                <FormText
                  textInputRef={description}
                  error={errors.description}
                  placeholder={'Ex: Urban oasis with ballfields & a zoo'}
                  area
                >
                  Description
                </FormText>
                <Dropdown items={countries} dropdownRef={dropdownList} error={errors.country} />
                <DatePicker datePickerRef={datePicker} error={errors.date}>
                  Date
                </DatePicker>
                <RadioForm
                  name="category"
                  items={categories}
                  ref={this.setCategoriesRef}
                  error={errors.category}
                />
                <ProfilePicture onRef={profilePicture} error={errors.authorImage} />
                <FormText
                  textInputRef={firstName}
                  error={errors.firstName}
                  placeholder={'Ex: John'}
                >
                  Your name
                </FormText>
                <FormText textInputRef={lastName} error={errors.lastName} placeholder={'Ex: Doe'}>
                  Your surname
                </FormText>
                <CheckboxForm
                  name="rules"
                  items={rules}
                  ref={this.setRulesRef}
                  error={errors.rules}
                />
              </div>
            </div>
            <button type="submit" className={classNames(styles.formButton, effects.buttonShadow)}>
              Add Post
            </button>
          </form>
        </div>
        <PopupModal isVisible={isPopupVisible} togglePopup={this.togglePopup}>
          Post has successfully created
        </PopupModal>
      </section>
    );
  }
}
