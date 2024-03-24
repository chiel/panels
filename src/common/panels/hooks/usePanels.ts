import { useMemo, useState } from 'react';

import { PanelsConfig } from '../types';
import computeDefaultWidths from '../utils/computeDefaultWidths';
import finaliseConfig from '../utils/finaliseConfig';

export default function usePanels(
	availableWidth: number,
	panelsConfig: PanelsConfig,
) {
	const finalPanelsConfig = useMemo(
		() => finaliseConfig(availableWidth, panelsConfig),
		[availableWidth, panelsConfig],
	);

	const [widths] = useState(() =>
		computeDefaultWidths(availableWidth, finalPanelsConfig),
	);

	return useMemo(() => ({ widths }), [widths]);
}
