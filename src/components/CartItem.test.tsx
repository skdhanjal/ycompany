import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { CartItem } from './CartItem';

describe('CartItem Component', () => {
  const item = {
    id: 1,
    name: 'Test Item',
    price: 10.99,
    imgUrl: 'test-url',
  };

  const quantity = 2;

  test('renders cart item', () => {
    render(
      <ShoppingCartProvider>
        <CartItem id={item.id} quantity={quantity} />
      </ShoppingCartProvider>
    );

    // Check if the item details are rendered correctly
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('x2')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('$21.98')).toBeInTheDocument();
  });

  test('clicking remove button calls removeFromCart function', () => {
    const removeFromCart = jest.fn();

    render(
      <ShoppingCartProvider value={{ removeFromCart }}>
        <CartItem id={item.id} quantity={quantity} />
      </ShoppingCartProvider>
    );

    // Click the remove button
    fireEvent.click(screen.getByRole('button', { name: '×' }));

    // Check if removeFromCart was called with the correct item id
    expect(removeFromCart).toHaveBeenCalledWith(item.id);
  });

  test('renders nothing if item is not found', () => {
    render(
      <ShoppingCartProvider>
        <CartItem id={999} quantity={quantity} />
      </ShoppingCartProvider>
    );

    // Check if component returns null when item is not found
    expect(screen.queryByTestId('cart-item')).toBeNull();
  });
});
