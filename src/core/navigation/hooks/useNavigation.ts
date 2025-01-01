import { useContext } from 'react';

import Context from '../Context';

export default function useNavigation() {
	const ctx = useContext(Context);
	if (!ctx) {
		throw new Error(
			'useNavigation may only be used within a NavigationProvider',
		);
	}

	return ctx;
}
