import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  it('should set and get a value in local storage', () => {
    const key = 'testKey';
    const initialValue = 'initialValue';

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const [value, setValue] = result.current;

    expect(value).toBe('initialValue');

    act(() => {
      setValue('updatedValue');
    });

    const [updatedValue] = result.current;

    expect(updatedValue).toBe('updatedValue');

    const storedValue = JSON.parse(localStorage.getItem(key)!);

    expect(storedValue).toBe('updatedValue');
  });
});
