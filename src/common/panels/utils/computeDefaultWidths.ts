import type { FinalPanelsConfig } from '../types';

export default function computeDefaultWidths(
	availableWidth: number,
	panelsConfig: FinalPanelsConfig,
): number[] {
	const widths = panelsConfig.map(() => 0);

	// fill each panel up to its mininmum first
	panelsConfig.forEach(({ minWidth }, i) => {
		widths[i] = minWidth;
	});

	const consumedWidth = widths.reduce((acc, w) => acc + w, 0);
	let remainingWidth = availableWidth - consumedWidth;

	if (remainingWidth <= 0) {
		return widths;
	}

	// check how many panels have an initialWidth set
	let remainingPanelCount = panelsConfig.reduce(
		(acc, { initialWidth }) => (initialWidth !== Infinity ? acc + 1 : acc),
		0,
	);

	// first fill each panel that has an initialWidth
	panelsConfig
		// check how much width is needed for each panel
		.map(({ initialWidth }, i) => [i, initialWidth - widths[i]])
		// remove any panels that have an `Infinity` width
		.filter(([, reqWidth]) => reqWidth !== Infinity)
		// sort by how much width is needed - least to most
		.sort((a, b) => a[1] - b[1])
		// fill each panel as much as possible up to its initialWidth
		.forEach(([i, reqWidth]) => {
			const averagePerPanel = Math.round(remainingWidth / remainingPanelCount);
			const fillWidth = Math.min(reqWidth, averagePerPanel);

			widths[i] += fillWidth;
			remainingPanelCount--;
			remainingWidth -= fillWidth;
		});

	if (remainingWidth <= 0) {
		return widths;
	}

	// check how many panels do not have an initialWidth set
	remainingPanelCount = panelsConfig.reduce(
		(acc, { initialWidth }) => (initialWidth === Infinity ? acc + 1 : acc),
		0,
	);

	// then fill each panel that does not have an initial width,
	// starting with the smallest required width to fill the max
	panelsConfig
		.map(({ maxWidth }, i) => [i, maxWidth - widths[i]])
		// only use panels that do not have a fixed initialWidth
		.filter(([i]) => panelsConfig[i].initialWidth === Infinity)
		// sort by how much width is needed - least to most
		.sort((a, b) => a[1] - b[1])
		// fill each panel with the average
		.forEach(([i, reqWidth]) => {
			const averagePerPanel = Math.round(remainingWidth / remainingPanelCount);
			const fillWidth = Math.min(reqWidth, averagePerPanel);

			widths[i] += fillWidth;
			remainingPanelCount--;
			remainingWidth -= fillWidth;
		});

	return widths;
}
