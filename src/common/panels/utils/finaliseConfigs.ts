import type { PanelConfig } from '../types';

export type FinalPanelConfig = {
	defaultSize: number;
	maxSize: number;
	minSize: number;
};

function resolveSize(value: number | undefined, availableSize: number, fallback: number) {
	if (value === undefined) return fallback;
	if (value > 0 && value < 1) return availableSize * value;
	return value;
}

export default function finaliseConfigs(
	availableSize: number,
	configs: Record<string, PanelConfig>,
) {
	const result: Record<string, FinalPanelConfig> = {};

	for (const [name, config] of Object.entries(configs)) {
		const minSize = resolveSize(config.minSize, availableSize, 0);
		const maxSize = resolveSize(config.maxSize, availableSize, Infinity);
		const defaultSize = resolveSize(config.defaultSize, availableSize, minSize);

		result[name] = { defaultSize, maxSize, minSize };
	}

	return result;
}
