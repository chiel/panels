import type { PanelConfig } from '../types';

import sum from './sum';

type Options = {
	availableSize: number;
	configs: PanelConfig[];
	previousConfigs: PanelConfig[];
	sizes: number[];
};

export default function calculateSizes({
	availableSize,
	configs,
	previousConfigs,
	sizes,
}: Options): number[] {
	const existingConfigs =
		previousConfigs.length > 0
			? configs.filter((config) => previousConfigs.includes(config))
			: [];

	const existingSize = sum(
		existingConfigs
			.map((config) => previousConfigs.indexOf(config))
			.map((i) => sizes[i]),
	);
	console.log('existingSize', existingSize);

	const newConfigs =
		previousConfigs.length > 0
			? configs.filter((config) => !previousConfigs.includes(config))
			: configs;

	const requiredSize = sum(newConfigs.map((config) => config.minSize));
	console.log('requiredSize', requiredSize);

	if (requiredSize < availableSize - existingSize) {
		console.log('just add the new sizes');
	} else {
		console.log('existing panels need to shrink');
	}

	return [];
}
