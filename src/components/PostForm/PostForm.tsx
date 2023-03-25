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
import PopupModal from '../PopupModal/PopupModal';
import { FormData } from '../../types/FormData.types';
import ValidateForm from './validators/ValidateForm';

type PostFormProps = {
  onSubmit: (formData: PlacesInfo | null) => void;
};

type PostFormState = {
  countries: CountriesInfo[];
  formData: PlacesInfo | null;
  errors: FormErrors;
  isPopupVisible: boolean;
  reset: boolean;
};

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
    reset: false,
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

    const errors = ValidateForm.validateForm(formData, rules);

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
      event.currentTarget.reset();
      this.setState({ reset: true });
    } else {
      this.setState({ reset: false });
    }
  };

  componentDidMount = async () => {
    const countries = await fetchCountries();
    this.setState({ countries });
  };

  render() {
    const { errors, countries, isPopupVisible, reset } = this.state;

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
              <ImageUpload imageFileRef={uploadImage} error={errors.image} reset={reset} />
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
                <DatePicker datePickerRef={datePicker} error={errors.date} reset={reset}>
                  Date
                </DatePicker>
                <RadioForm
                  name="category"
                  items={categories}
                  ref={this.setCategoriesRef}
                  error={errors.category}
                />
                <ProfilePicture onRef={profilePicture} error={errors.authorImage} reset={reset} />
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
