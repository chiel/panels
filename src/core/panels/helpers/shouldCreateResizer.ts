import type { PanelConfig } from '../types';

export default function shouldCreateResizer(
	i: number,
	configs: Record<string, PanelConfig>,
	order: string[],
) {
	if (i === 0) return false;

	return order
		.slice(0, i)
		.map((name) => configs[name])
		.some((config) => config.minSize < config.maxSize);
}
