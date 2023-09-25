import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { ShoppingCart } from './ShoppingCart';

describe('ShoppingCart Component', () => {
  const mockIsOpen = true;
  const mockCloseCart = jest.fn();
  const mockCartItems = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ];

  test('renders cart with correct items and total', () => {
    render(
      <ShoppingCartProvider value={{ closeCart: mockCloseCart, cartItems: mockCartItems }}>
        <ShoppingCart isOpen={mockIsOpen} />
      </ShoppingCartProvider>
    );

    // Check if Cart component is rendered with correct items and total
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('$21.98')).toBeInTheDocument();
  });

  test('clicking close button calls closeCart function', () => {
    render(
      <ShoppingCartProvider value={{ closeCart: mockCloseCart, cartItems: mockCartItems }}>
        <ShoppingCart isOpen={mockIsOpen} />
      </ShoppingCartProvider>
    );

    // Click the close button
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    // Check if closeCart was called
    expect(mockCloseCart).toHaveBeenCalled();
  });

  test('renders nothing if cart is not open', () => {
    render(
      <ShoppingCartProvider value={{ closeCart: mockCloseCart, cartItems: mockCartItems }}>
        <ShoppingCart isOpen={false} />
      </ShoppingCartProvider>
    );

    // Check if component returns null when cart is not open
    expect(screen.queryByText('Cart')).toBeNull();
  });
});
