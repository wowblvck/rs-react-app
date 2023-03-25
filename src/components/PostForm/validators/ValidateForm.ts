import { FormData } from '../../../types/FormData.types';
import { FormErrors } from '../../../interfaces';
import moment from 'moment';

export default class ValidateForm {
  static validateForm(formData: FormData, rules: HTMLInputElement[]): FormErrors {
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
  }
}
