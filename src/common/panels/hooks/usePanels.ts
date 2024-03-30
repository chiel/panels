import { useEffect, useMemo, useRef, useState } from 'react';

import { PanelsConfig } from '../types';
import computeDefaultWidths from '../utils/computeDefaultWidths';
import finaliseConfig from '../utils/finaliseConfig';

export default function usePanels(
	availableWidth: number,
	panelsConfig: PanelsConfig,
) {
	const curAvailableWidth = useRef(availableWidth);

	const finalPanelsConfig = useMemo(
		() => finaliseConfig(availableWidth, panelsConfig),
		[availableWidth, panelsConfig],
	);

	const [widths, setWidths] = useState(() =>
		computeDefaultWidths(availableWidth, finalPanelsConfig),
	);

	useEffect(() => {
		if (availableWidth !== curAvailableWidth.current) {
			const newWidths = computeDefaultWidths(availableWidth, finalPanelsConfig);
			setWidths(newWidths);
			curAvailableWidth.current = availableWidth;
		}
	}, [availableWidth, finalPanelsConfig]);

	return useMemo(() => ({ widths }), [widths]);
}
