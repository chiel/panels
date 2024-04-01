import { useEffect, useMemo } from 'react';

import { PanelsConfig } from '../types';
import finaliseConfig from '../utils/finaliseConfig';
import mutateWidths from '../utils/mutateWidths';

import useDelta from './useDelta';
import useDrag from './useDrag';
import useWidths from './useWidths';

export default function usePanels(
	availableWidth: number,
	panelsConfig: PanelsConfig,
) {
	const finalPanelsConfig = useMemo(
		() => finaliseConfig(availableWidth, panelsConfig),
		[availableWidth, panelsConfig],
	);

	const [widths, setWidths] = useWidths(availableWidth, finalPanelsConfig);
	const { createOnResizeStart, drag } = useDrag(widths);
	const delta = useDelta(drag);

	const onResizeStartHandlers = useMemo(
		() =>
			new Array(finalPanelsConfig.length - 1)
				.fill(0)
				.map((_config, i) => createOnResizeStart(i)),
		[createOnResizeStart, finalPanelsConfig],
	);

	useEffect(() => {
		if (delta === null || drag === null) return;

		setWidths(
			mutateWidths({
				delta,
				drag,
				panelsConfig: finalPanelsConfig,
			}),
		);
	}, [delta, drag, finalPanelsConfig, setWidths]);

	return useMemo(
		() => ({ onResizeStartHandlers, widths }),
		[onResizeStartHandlers, widths],
	);
}
