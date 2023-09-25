import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { StoreItem } from './StoreItem';

describe('StoreItem Component', () => {
  const mockStoreItem = {
    id: 1,
    name: 'Test Item',
    price: 10.99,
    imgUrl: 'test-url',
  };

  const mockGetItemQuantity = jest.fn();
  const mockIncreaseCartQuantity = jest.fn();
  const mockDecreaseCartQuantity = jest.fn();
  const mockRemoveFromCart = jest.fn();

  test('renders store item with correct details', () => {
    render(
      <ShoppingCartProvider
        value={{
          getItemQuantity: mockGetItemQuantity,
          increaseCartQuantity: mockIncreaseCartQuantity,
          decreaseCartQuantity: mockDecreaseCartQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <StoreItem {...mockStoreItem} />
      </ShoppingCartProvider>
    );

    // Check if StoreItem component is rendered with correct details
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Add To Cart' })).toBeInTheDocument();
  });

  test('clicking add to cart button calls increaseCartQuantity function', () => {
    render(
      <ShoppingCartProvider
        value={{
          getItemQuantity: mockGetItemQuantity,
          increaseCartQuantity: mockIncreaseCartQuantity,
          decreaseCartQuantity: mockDecreaseCartQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <StoreItem {...mockStoreItem} />
      </ShoppingCartProvider>
    );

    // Click the Add To Cart button
    fireEvent.click(screen.getByRole('button', { name: '+ Add To Cart' }));

    // Check if increaseCartQuantity was called with correct item id
    expect(mockIncreaseCartQuantity).toHaveBeenCalledWith(1);
  });

  // Add more tests for different scenarios (e.g., item already in cart, decreasing quantity, removing from cart)
});
