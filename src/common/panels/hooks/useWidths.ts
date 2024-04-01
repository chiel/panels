import { useEffect, useRef, useState } from 'react';

import { FinalPanelsConfig } from '../types';
import computeDefaultWidths from '../utils/computeDefaultWidths';

export default function useWidths(
	availableWidth: number,
	panelsConfig: FinalPanelsConfig,
) {
	const curAvailableWidth = useRef(availableWidth);

	const [widths, setWidths] = useState(() =>
		computeDefaultWidths(availableWidth, panelsConfig),
	);

	useEffect(() => {
		if (availableWidth !== curAvailableWidth.current) {
			const newWidths = computeDefaultWidths(availableWidth, panelsConfig);
			setWidths(newWidths);
			curAvailableWidth.current = availableWidth;
		}
	}, [availableWidth, panelsConfig]);

	return [widths, setWidths] as const;
}
