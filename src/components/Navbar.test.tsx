import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const mockOpenCart = jest.fn();
  const mockCartQuantity = 2;

  test('renders navbar with correct links', () => {
    render(
      <Router>
        <ShoppingCartProvider value={{ openCart: mockOpenCart, cartQuantity: mockCartQuantity }}>
          <Navbar />
        </ShoppingCartProvider>
      </Router>
    );

    // Check if the Home and About links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('clicking cart button calls openCart function', () => {
    render(
      <Router>
        <ShoppingCartProvider value={{ openCart: mockOpenCart, cartQuantity: mockCartQuantity }}>
          <Navbar />
        </ShoppingCartProvider>
      </Router>
    );

    // Click the cart button
    fireEvent.click(screen.getByRole('button', { name: 'Cart' }));

    // Check if openCart was called
    expect(mockOpenCart).toHaveBeenCalled();
  });

  test('displays cart quantity if greater than 0', () => {
    render(
      <Router>
        <ShoppingCartProvider value={{ openCart: mockOpenCart, cartQuantity: mockCartQuantity }}>
          <Navbar />
        </ShoppingCartProvider>
      </Router>
    );

    // Check if the cart quantity is displayed
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('does not display cart quantity if 0', () => {
    render(
      <Router>
        <ShoppingCartProvider value={{ openCart: mockOpenCart, cartQuantity: 0 }}>
          <Navbar />
        </ShoppingCartProvider>
      </Router>
    );

    // Check if the cart quantity is not displayed
    expect(screen.queryByText('0')).toBeNull();
  });
});
