import { useContext, useEffect, useState } from 'react';

import Context from '../Context';
import { OnResizeStart, PanelConfig } from '../types';

export default function usePanel(
	container: HTMLDivElement | null,
	config: PanelConfig,
) {
	const ctx = useContext(Context);
	if (!ctx) throw new Error('`usePanel` must be used within `Panels`.');

	const { addPanel } = ctx;
	const [state, setState] = useState<{
		onResizeStart: OnResizeStart | null;
		size: number;
	}>({ onResizeStart: null, size: 100 });

	useEffect(() => {
		if (!container) return;
		return addPanel(container, config, (newSize, onResizeStart) => {
			setState({ onResizeStart, size: newSize });
		});
	}, [addPanel, config, container]);

	return state;
}
