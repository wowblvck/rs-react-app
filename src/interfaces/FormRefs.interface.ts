import React from 'react';

export default interface FormRefs {
  dropdownList: React.RefObject<HTMLSelectElement>;
  uploadImage: React.RefObject<HTMLInputElement>;
  datePicker: React.RefObject<HTMLInputElement>;
  place: React.RefObject<HTMLInputElement>;
  description: React.RefObject<HTMLTextAreaElement>;
  profilePicture: React.RefObject<HTMLInputElement>;
  firstName: React.RefObject<HTMLInputElement>;
  lastName: React.RefObject<HTMLInputElement>;
  categories: HTMLInputElement[];
  rules: HTMLInputElement[];
}
