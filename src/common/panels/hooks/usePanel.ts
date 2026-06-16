import { useLayoutEffect } from 'react';

import type { PanelConfig } from '../types';

import usePanels from './usePanels';

export default function usePanel(name: string, config: PanelConfig) {
	const panels = usePanels();

	useLayoutEffect(() => {
		return panels.addPanel(name, config);
	}, [panels, name, config]);
}
