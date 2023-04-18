import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PostForm from './PostForm';
import { Provider } from 'react-redux';
import { mockData } from '../../tests/mocks/mockData';
import configureAppStore from '../../store/store';

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];

const store = configureAppStore();

describe('PostForm', () => {
  window.URL.createObjectURL = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    const postFormTitle = screen.getByText(/create a post/i);
    expect(postFormTitle).toBeInTheDocument();
  });

  test('should render form elements', async () => {
    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    expect(await screen.getByLabelText('location')).toBeInTheDocument();
    expect(await screen.getByLabelText('description')).toBeInTheDocument();
    expect(await screen.getAllByRole('radio')).toHaveLength(categories.length);
    expect(await screen.getByLabelText('country')).toBeInTheDocument();
    expect(await screen.getByLabelText('author.avatar')).toBeInTheDocument();
    expect(await screen.getByLabelText('author.firstName')).toBeInTheDocument();
    expect(await screen.getByLabelText('author.lastName')).toBeInTheDocument();
    expect(await screen.getByLabelText('image')).toBeInTheDocument();
    expect(await screen.getByLabelText('date')).toBeInTheDocument();
    expect(await screen.getByLabelText('terms')).toBeInTheDocument();
    expect(await screen.getByLabelText('consent')).toBeInTheDocument();
  });

  test('submits the form when all fields are filled in correctly render form elements', async () => {
    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    const form = screen.getByTestId('post-form');
    const locationInput = screen.getByLabelText('location');
    const descriptionInput = screen.getByLabelText('description');
    const categoryDropdown = screen.getAllByRole('radio');
    const countryDropdown = screen.getByLabelText('country');
    const avatar = screen.getByLabelText('author.avatar');
    const firstNameInput = screen.getByLabelText('author.firstName');
    const lastNameInput = screen.getByLabelText('author.lastName');
    const image = screen.getByLabelText('image');
    const datepicker = screen.getByLabelText('date');
    const termsCheckbox = screen.getByLabelText('terms');
    const consentCheckbox = screen.getByLabelText('consent');

    fireEvent.change(locationInput, { target: { value: mockData[0].location } });
    fireEvent.change(descriptionInput, { target: { value: mockData[0].description } });
    fireEvent.change(categoryDropdown[2], { target: { value: mockData[0].category } });
    fireEvent.change(countryDropdown, { target: { value: mockData[0].country } });
    const imageAvatar = new File(['test image'], 'test.png', { type: 'image/png' });
    fireEvent.change(avatar, { target: { files: [imageAvatar] } });

    fireEvent.change(firstNameInput, { target: { value: mockData[0].author.first_name } });
    fireEvent.change(lastNameInput, { target: { value: mockData[0].author.last_name } });
    fireEvent.change(datepicker, { target: { value: mockData[0].date } });
    const imageMain = new File(['test image'], 'test.png', { type: 'image/png' });
    fireEvent.change(image, { target: { files: [imageMain] } });

    fireEvent.click(termsCheckbox);
    fireEvent.click(consentCheckbox);

    fireEvent.submit(form);
  });
});
