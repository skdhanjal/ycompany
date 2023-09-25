import { render } from '@testing-library/react';
import Store from './Home';

describe('Store Component', () => {
	it('renders without crashing', () => {
		render(<Store />);
	});

	it('renders the featured products header', () => {
		const { getByText } = render(<Store />);
		const headerElement = getByText(/Featured Products/i);
		expect(headerElement).toBeInTheDocument();
	});
});


