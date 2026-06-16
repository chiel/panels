import { useContext } from 'react';

import { PanelsContext } from '../PanelsContext';

export default function usePanels() {
	const ctx = useContext(PanelsContext);
	if (!ctx) throw new Error('usePanels must be used within <Panels>');
	return ctx;
}
