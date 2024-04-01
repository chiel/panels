import { Drag } from '../hooks/useDrag';
import { FinalPanelsConfig } from '../types';

import clamp from './clamp';

type Options = {
	delta: number;
	drag: Drag;
	panelsConfig: FinalPanelsConfig;
};

export default function mutateWidths({ delta, drag, panelsConfig }: Options) {
	const { handle, widths } = drag;
	if (delta === 0) return widths;

	const panelNumbers = panelsConfig.map((_, i) => i);
	const left = panelNumbers.slice(0, handle + 1).reverse();
	const right = panelNumbers.slice(handle + 1);

	const grow = delta < 0 ? right : left;
	const shrink = delta < 0 ? left : right;

	const newWidths = [...widths];

	const actualDelta = Math.min(
		Math.abs(delta),
		shrink.reduce((acc, i) => acc + (widths[i] - panelsConfig[i].minWidth), 0),
		grow.reduce((acc, i) => acc + (panelsConfig[i].maxWidth - widths[i]), 0),
	);

	let remainingDelta = actualDelta;
	shrink.forEach((i) => {
		const { maxWidth, minWidth } = panelsConfig[i];
		newWidths[i] = clamp(widths[i] - remainingDelta, minWidth, maxWidth);
		remainingDelta -= widths[i] - newWidths[i];
	});

	remainingDelta = actualDelta;
	grow.forEach((i) => {
		const { maxWidth, minWidth } = panelsConfig[i];
		newWidths[i] = clamp(widths[i] + remainingDelta, minWidth, maxWidth);
		remainingDelta -= newWidths[i] - widths[i];
	});

	return newWidths;
}
