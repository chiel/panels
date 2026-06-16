import type { FinalPanelConfig } from './finaliseConfigs';

export default function computeDefaultSizes(
	availableSize: number,
	configs: Record<string, FinalPanelConfig>,
) {
	const names = Object.keys(configs);
	const sizes: Record<string, number> = {};

	names.forEach((name) => {
		sizes[name] = configs[name].minSize;
	});

	let remaining =
		availableSize - names.reduce((acc, name) => acc + sizes[name], 0);
	if (remaining <= 0) return sizes;

	const withDefault = names.filter(
		(name) => configs[name].defaultSize !== configs[name].minSize,
	);
	const withoutDefault = names.filter(
		(name) => configs[name].defaultSize === configs[name].minSize,
	);

	const operations = [
		[withDefault, 'defaultSize'],
		[withoutDefault, 'maxSize'],
	] as const;

	operations.forEach(([panels, property]) => {
		if (remaining <= 0) return;

		let remainingCount = panels.length;
		[...panels]
			.map((name) => [name, configs[name][property] - sizes[name]] as const)
			.sort((a, b) => a[1] - b[1])
			.forEach(([name, reqSize]) => {
				const average = Math.round(remaining / remainingCount);
				const fill = Math.min(reqSize, average);

				remainingCount--;
				sizes[name] += fill;
				remaining -= fill;
			});
	});

	return sizes;
}
