type FormValues = {
  location: string;
  description: string;
  category: string;
  country: string;
  date: string;
  author: {
    avatar: File;
    firstName: string;
    lastName: string;
  };
  image: File;
  terms: boolean;
  consent: boolean;
};

export default FormValues;
