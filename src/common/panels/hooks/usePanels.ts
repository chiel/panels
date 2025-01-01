// import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Listener, PanelConfig } from '../types';

import useDelta from './useDelta';
import useDrag from './useDrag';
import useSizes from './useSizes';

enum Orientation {
	Horizontal = 'HORIZONTAL',
	Vertical = 'VERTICAL',
}

export default function usePanels(
	container: HTMLDivElement | null,
	availableSize: number,
	orientation: Orientation = Orientation.Horizontal,
) {
	if (orientation === Orientation.Vertical) {
		throw new Error('Vertical orientation is not yet supported');
	}

	// const [panels, setPanels] = useState<
	// 	[HTMLDivElement, PanelConfig, Listener][]
	// >([]);
	// const orderedPanels = useMemo(
	// 	() =>
	// 		!container
	// 			? []
	// 			: ([...container.children]
	// 					.map((child) => panels.find(([pc]) => pc === child))
	// 					.filter((panelConfig) => !!panelConfig) as typeof panels),
	// 	[container, panels],
	// );
	// const configs = useMemo(
	// 	() => orderedPanels.map(([, config]) => config),
	// 	[orderedPanels],
	// );
	// const [sizes] = useSizes(availableSize, configs);
	// const { createOnResizeStart, drag } = useDrag(sizes);
	// const delta = useDelta(drag);

	// const onResizeStartHandlers = useMemo(
	// 	() =>
	// 		sizes.length > 0
	// 			? new Array(sizes.length - 1)
	// 					.fill(0)
	// 					.map((_n, i) => createOnResizeStart(i))
	// 			: [],
	// 	[createOnResizeStart, sizes],
	// );

	// useEffect(() => {
	// 	if (drag === null || delta === null) return;

	// 	console.log('COMPUTE STUFF', { availableSize, delta, drag, sizes });
	// }, [availableSize, drag, delta, sizes]);

	// useEffect(() => {
	// 	orderedPanels.forEach(([, , listener], i) => {
	// 		// console.log('PROCESS', sizes[i], listener);
	// 		listener(sizes[i], onResizeStartHandlers[i] || null);
	// 	});
	// }, [availableSize, onResizeStartHandlers, orderedPanels, sizes]);

	const addPanel = useCallback(
		(
			name: string,
			config: PanelConfig,
			// listener: Listener,
		) => {
			console.log('add panel', name, config);
			// setPanels((currentPanels) => [
			// 	...currentPanels,
			// 	[panelContainer, config, listener],
			// ]);

			// return () => {
			// 	setPanels((currentPanels) =>
			// 		currentPanels.filter(([pc]) => pc !== panelContainer),
			// 	);
			// };
		},
		[],
	);

	return useMemo(() => ({ addPanel }), [addPanel]);
}
