import type { PanelConfig } from '../types';

export default function sanitiseConfig(
	config: PanelConfig,
	savedSize: number | undefined,
	totalSize: number,
) {
	let isDirty = false;
	const newConfig = { ...config };
	if (savedSize && savedSize !== newConfig.defaultSize) {
		isDirty = true;
		newConfig.defaultSize = savedSize;
	}

	Object.entries(newConfig).forEach(([k, v]) => {
		if (v > 0 && v < 1) {
			isDirty = true;
			newConfig[k as keyof PanelConfig] = totalSize * v;
		}
	});

	if (newConfig.minSize < 0) {
		isDirty = true;
		newConfig.minSize = 0;
	}

	if (newConfig.maxSize < newConfig.minSize) {
		isDirty = true;
		newConfig.maxSize = newConfig.minSize;
	}

	if (newConfig.defaultSize < newConfig.minSize) {
		isDirty = true;
		newConfig.defaultSize = newConfig.minSize;
	}

	if (newConfig.defaultSize > newConfig.maxSize) {
		isDirty = true;
		newConfig.defaultSize = newConfig.maxSize;
	}

	return isDirty ? newConfig : config;
}
