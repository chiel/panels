import type { FinalPanelsConfig, PanelsConfig } from '../types';

import clamp from './clamp';
import defaultOption from './defaultOption';

export default function finaliseConfig(
	availableWidth: number,
	panelsConfig: PanelsConfig,
): FinalPanelsConfig {
	return panelsConfig.map((panelConfig) => {
		let minWidth = defaultOption(panelConfig.minWidth, 0);
		if (minWidth > 0 && minWidth < 1) {
			minWidth = availableWidth * minWidth;
		}
		minWidth = Math.floor(clamp(minWidth, 0, Infinity));

		let maxWidth = defaultOption(panelConfig.maxWidth, Infinity);
		if (maxWidth > 0 && maxWidth < 1) {
			maxWidth = availableWidth * maxWidth;
		}
		maxWidth = Math.floor(clamp(maxWidth, minWidth, Infinity));

		let initialWidth = defaultOption(panelConfig.initialWidth, Infinity);
		if (initialWidth > 0 && initialWidth < 1) {
			initialWidth = availableWidth * initialWidth;
		}
		if (initialWidth !== Infinity) {
			initialWidth = Math.floor(clamp(initialWidth, minWidth, maxWidth));
		}

		return { initialWidth, maxWidth, minWidth };
	});
}
