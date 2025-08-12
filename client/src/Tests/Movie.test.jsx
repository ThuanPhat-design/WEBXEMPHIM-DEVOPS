import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Movie from '../Components/Movie';

// reducer mock đơn giản
const mockReducer = (state = {}) => state;

describe('Movie Component', () => {
  const movieData = {
    _id: '123',
    name: 'Sample Movie',
    image: '/sample.jpg',
    category: 'Action',
    time: '2h'
  };

  // tạo store giả lập
  const store = configureStore({
    reducer: {
      userLikeMovie: () => ({ isLoading: false }),
      userLogin: () => ({})
    }
  });

  const renderWithProviders = (ui) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );
  };

  test('renders movie name', () => {
    renderWithProviders(<Movie movie={movieData} />);
    const nameElement = screen.getByText(movieData.name);
    expect(nameElement).toBeInTheDocument();
  });

  test('renders movie image', () => {
    renderWithProviders(<Movie movie={movieData} />);
    const imageElement = screen.getByAltText(movieData.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', movieData.image);
  });

  test('renders link to movie detail', () => {
    renderWithProviders(<Movie movie={movieData} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/movie/${movieData._id}`);
  });
});
