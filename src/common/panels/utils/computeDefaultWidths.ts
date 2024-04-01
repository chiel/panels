import type { FinalPanelsConfig } from '../types';

import sum from './sum';

export default function computeDefaultWidths(
	availableWidth: number,
	panelsConfig: FinalPanelsConfig,
): number[] {
	const widths = panelsConfig.map((config) => config.minWidth);

	let remainingWidth = availableWidth - sum(widths);
	if (remainingWidth <= 0) return widths;

	const panelNumbers = panelsConfig.map((_, i) => i);
	const initial = panelNumbers.filter(
		(i) => panelsConfig[i].initialWidth !== Infinity,
	);
	const noInitial = panelNumbers.filter(
		(i) => panelsConfig[i].initialWidth === Infinity,
	);

	const operations = [
		[initial, 'initialWidth'],
		[noInitial, 'maxWidth'],
	] as const;

	operations.forEach(([panels, property]) => {
		if (remainingWidth <= 0) return;

		let remainingCount = panels.length;
		panels
			.map((i) => [i, panelsConfig[i][property] - widths[i]])
			.sort((a, b) => a[1] - b[1])
			.forEach(([i, reqWidth]) => {
				const averageWidth = Math.round(remainingWidth / remainingCount);
				const fillWidth = Math.min(reqWidth, averageWidth);

				remainingCount--;
				widths[i] += fillWidth;
				remainingWidth -= fillWidth;
			});
	});

	return widths;
}
