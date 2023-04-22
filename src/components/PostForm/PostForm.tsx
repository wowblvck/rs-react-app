import React, { useState } from 'react';
import * as yup from 'yup';
import styles from './PostForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { countries } from '../../static/countries';

import {
  Dropdown,
  ImageUpload,
  DatePicker,
  FormText,
  RadioForm,
  CheckboxForm,
  ProfilePicture,
} from './modules';

import { PlacesInfoDto } from '../../interfaces';
import { FormValues } from '../../types/';
import uploadImage from '../../thunks/image.thunk';

import PopupModal from '../PopupModal/PopupModal';
import Button from '../Button/Button';
import { useAddPlaceMutation } from '../../thunks/places.thunk';
import { useAppDispatch } from '../../store/store';
import { setItems } from '../../store/reducers/formPlaces.reducer';
import { CSSTransition } from 'react-transition-group';

const schema = yup.object().shape({
  location: yup
    .string()
    .min(5, 'Length must be at least 5')
    .max(20, 'The length must be no more than 20')
    .matches(/^[A-Z]/, 'First character must be uppercase')
    .required('Field is required'),
  description: yup
    .string()
    .min(20, 'Length must be at least 20')
    .max(300, 'The length must be no more than 300')
    .matches(/^[A-Z]/, 'First character must be uppercase')
    .required(),
  category: yup.string().required('Select category'),
  country: yup.string().required('Select country'),
  author: yup.object().shape({
    avatar: yup
      .mixed()
      .test('file', 'Upload an image', (value) => {
        const file = value as File;
        return !!file.size;
      })
      .test('type', 'Only JPEG, PNG, GIF', (value) => {
        const file = value as File;
        return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      }),
    firstName: yup
      .string()
      .min(2, 'Length must be at least 2')
      .max(32, 'The length must be no more than 32')
      .matches(/^[A-Z]/, 'First character must be uppercase')
      .required('Field is required'),
    lastName: yup
      .string()
      .min(2, 'Length must be at least 2')
      .max(32, 'The length must be no more than 32')
      .matches(/^[A-Z]/, 'First character must be uppercase')
      .required('Field is required'),
  }),
  image: yup
    .mixed()
    .test('file', 'Upload an image', (value) => {
      const file = value as File;
      return !!file.size;
    })
    .test('type', 'Only JPEG, PNG, GIF', (value) => {
      const file = value as File;
      return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    }),
  date: yup
    .string()
    .required('Date is required')
    .test('beforeToday', 'Specified date is greater than the current date', (value) =>
      moment(value).isSameOrBefore(moment(), 'day')
    ),
  terms: yup.boolean().oneOf([true], 'You must accept the terms of the user agreement'),
  consent: yup.boolean().oneOf([true], 'Consent is required'),
});

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];

const PostForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [addPlace, { isSuccess }] = useAddPlaceMutation();
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const onSubmit: SubmitHandler<FormValues> = async (obj) => {
    const { location, description, category, image, date, author, country } = obj;

    try {
      setIsLoading(true);
      const [imageLink, imageProfileLink] = await Promise.all([
        uploadImage(image),
        uploadImage(author.avatar),
      ]);

      const formData: PlacesInfoDto = {
        location,
        description,
        country,
        category,
        image: imageLink,
        date,
        author: {
          avatar: imageProfileLink,
          first_name: author.firstName,
          last_name: author.lastName,
        },
      };

      try {
        const result = await addPlace(formData).unwrap();
        reset();
        dispatch(setItems(result));
        setShowPopup(true);
      } catch (e) {
        console.log(`Failed while add place in database`);
      }
    } catch (e) {
      console.log(`Failed while load image on host`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.postForm}>
      <div className={styles.container}>
        <h2 className={styles.postForm__title}>Create a post ✏️</h2>
        <form
          className={styles.formContent}
          onSubmit={handleSubmit(onSubmit)}
          data-testid="post-form"
        >
          <div className={styles.formContainer}>
            <ImageUpload
              register={register}
              name="image"
              error={errors.image}
              setValue={setValue}
              reset={isSuccess}
            />
            <div className={styles.formWrapper}>
              <FormText
                register={register}
                name="location"
                placeholder={'Ex: Central Garden'}
                error={errors.location}
              >
                Name of location
              </FormText>

              <FormText
                register={register}
                name="description"
                placeholder={'Ex: Urban oasis with ballfields & a zoo'}
                area
                error={errors.description}
              >
                Description
              </FormText>

              <Dropdown
                register={register}
                name="country"
                items={countries}
                error={errors.country}
              />
              <DatePicker
                register={register}
                name="date"
                error={errors.date}
                setValue={setValue}
                reset={isSuccess}
              >
                Date
              </DatePicker>
              <RadioForm
                register={register}
                name="category"
                items={categories}
                error={errors.category}
              />
              <ProfilePicture
                register={register}
                name="author.avatar"
                error={errors.author?.avatar}
                setValue={setValue}
                reset={isSuccess}
              />
              <FormText
                register={register}
                name="author.firstName"
                placeholder={'Ex: John'}
                error={errors.author?.firstName}
              >
                Your name
              </FormText>
              <FormText
                register={register}
                name="author.lastName"
                placeholder={'Ex: Doe'}
                error={errors.author?.lastName}
              >
                Your surname
              </FormText>
              <CheckboxForm register={register} name="terms" error={errors.terms}>
                I accept the terms of posting
              </CheckboxForm>
              <CheckboxForm register={register} name="consent" error={errors.consent}>
                I consent to the publication of my name and surname
              </CheckboxForm>
            </div>
          </div>
          <Button className={styles.formButton} isLoading={isLoading}>
            Add Post
          </Button>
        </form>
      </div>
      <CSSTransition
        in={showPopup}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit
      >
        <PopupModal onClose={handlePopup}>Post has successfully created</PopupModal>
      </CSSTransition>
    </section>
  );
};

export default PostForm;
