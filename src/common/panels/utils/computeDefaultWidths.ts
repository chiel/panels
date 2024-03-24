import type { FinalPanelsConfig } from '../types';

export default function computeDefaultWidths(
	availableWidth: number,
	panelsConfig: FinalPanelsConfig,
): number[] {
	console.log('PANELS CONFIG', panelsConfig);
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

	// TODO: we should figure out in which order to fill panels up
	// braindump: we can figure out which panel has priority based
	// on a few things:
	// - if it has an initialWidth, it is probably important that
	//   that width is maintained
	// - if a panel has NO initialWidth (i.e., Infinity), that is
	//   likely to be the "main" panel, could be multiple
	// - if a panel has a maxWidth... I dunno, maybe that makes it
	//   less important?
	// - would central panels be more important than side ones?
	//
	// manually assigning priority in the config would also be an
	// option

	// from left to right, we fill each panel that has an
	// `initialWidth` up to that size, if possible
	panelsConfig.forEach(({ initialWidth }, i) => {
		if (initialWidth === Infinity) return;

		const requiredWidth = initialWidth - widths[i];
		const fillWidth = Math.min(requiredWidth, remainingWidth);
		widths[i] = widths[i] + fillWidth;
		remainingWidth = remainingWidth - fillWidth;
	});

	// if (remainingWidth <= 0) {
	// 	return widths;
	// }

	// console.log('remaining', remainingWidth);

	return widths;
}
