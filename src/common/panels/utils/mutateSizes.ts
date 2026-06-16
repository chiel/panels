import type { Drag } from '../hooks/useDrag';

import clamp from './clamp';
import type { FinalPanelConfig } from './finaliseConfigs';
import getPanelNames from './getPanelNames';

type Options = {
	children: Element[];
	configs: Record<string, FinalPanelConfig>;
	delta: number;
	drag: Drag;
};

export default function mutateSizes({
	children,
	configs,
	delta,
	drag,
}: Options) {
	const { sizes } = drag;
	if (delta === 0) return sizes;

	const handleIndex = children.indexOf(drag.handle);
	if (handleIndex === -1) return sizes;

	const left = getPanelNames(children.slice(0, handleIndex)).reverse();
	const right = getPanelNames(children.slice(handleIndex + 1));

	const grow = delta < 0 ? right : left;
	const shrink = delta < 0 ? left : right;

	const newSizes = { ...sizes };

	const actualDelta = Math.min(
		Math.abs(delta),
		shrink.reduce((acc, name) => {
			return acc + (sizes[name] - configs[name].minSize);
		}, 0),
		grow.reduce((acc, name) => {
			return acc + (configs[name].maxSize - sizes[name]);
		}, 0),
	);

	let remaining = actualDelta;
	shrink.forEach((name) => {
		const { minSize, maxSize } = configs[name];
		newSizes[name] = clamp(sizes[name] - remaining, minSize, maxSize);
		remaining -= sizes[name] - newSizes[name];
	});

	remaining = actualDelta;
	grow.forEach((name) => {
		const { minSize, maxSize } = configs[name];
		newSizes[name] = clamp(sizes[name] + remaining, minSize, maxSize);
		remaining -= newSizes[name] - sizes[name];
	});

	return newSizes;
}
