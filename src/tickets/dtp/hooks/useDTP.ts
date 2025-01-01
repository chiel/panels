import { useContext } from 'react';

import Context from '../Context';

export default function useDTP() {
	const ctx = useContext(Context);
	if (!ctx) {
		throw new Error('useDTP may only be used within a DTPProvider');
	}

	return ctx;
}
