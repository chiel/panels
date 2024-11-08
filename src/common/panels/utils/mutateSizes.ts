import type { Drag } from '../hooks/useDrag';
import type { PanelConfig } from '../types';

import clamp from './clamp';

type Options = {
	configs: PanelConfig[];
	delta: number;
	drag: Drag;
};

export default function mutateSizes({ configs, delta, drag }: Options) {
	const { handle, sizes } = drag;
	if (delta === 0) return sizes;

	const panelNumbers = configs.map((_, i) => i);
	const left = panelNumbers.slice(0, handle + 1).reverse();
	const right = panelNumbers.slice(handle + 1);

	const grow = delta < 0 ? right : left;
	const shrink = delta < 0 ? left : right;

	const newSizes = [...sizes];

	const actualDelta = Math.min(
		Math.abs(delta),
		shrink.reduce((acc, i) => acc + (sizes[i] - configs[i].minSize), 0),
		grow.reduce((acc, i) => acc + (configs[i].maxSize - sizes[i]), 0),
	);

	let remainingDelta = actualDelta;
	shrink.forEach((i) => {
		const { maxSize, minSize } = configs[i];
		newSizes[i] = clamp(sizes[i] - remainingDelta, minSize, maxSize);
		remainingDelta -= sizes[i] - newSizes[i];
	});

	remainingDelta = actualDelta;
	grow.forEach((i) => {
		const { maxSize, minSize } = configs[i];
		newSizes[i] = clamp(sizes[i] + remainingDelta, minSize, maxSize);
		remainingDelta -= newSizes[i] - sizes[i];
	});

	return newSizes;
}
