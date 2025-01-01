import type { PanelConfig } from '../types';
import sum from './sum';

type Options = {
	availableSize: number;
	configs: Record<string, PanelConfig>;
	order: string[];
	previousOrder: string[];
	previousSizes: Record<string, number>;
};

type PanelDelta = [string, number];

export default function calculateSizes({
	availableSize,
	configs,
	order,
	previousOrder,
	previousSizes,
}: Options) {
	// 1.
	// Scale all panels up to their minimum, regardless of how much space there is
	// available, if this does not fit, a scroll bar will need to be shown
	const sizes = order.reduce(
		(acc, name) => ({ ...acc, [name]: configs[name].minSize }),
		{} as Record<string, number>,
	);

	let remainingSize = availableSize - sum(Object.values(sizes));
	if (remainingSize <= 0) return sizes;

	// TODO: think of better names, maybe something like applyDelta, since
	// that's essentially what's happening. These functions can also be used
	// to apply negative deltas
	// Distribute remainingSize evenly across panels up to given delta
	const evenDistribute = (panels: PanelDelta[]) => {
		if (!remainingSize) return;
		let remainingCount = panels.length;
		panels.forEach(([name, delta]) => {
			const averageSize = Math.round(remainingSize / remainingCount);
			const fillSize = Math.min(delta, averageSize);
			sizes[name] += fillSize;
			remainingSize -= fillSize;
			remainingCount--;
		});
	};

	// Distribute remainingSize across panels in given order up to given delta
	const priorityDistribute = (panels: PanelDelta[]) => {
		if (!remainingSize) return;
		panels.forEach(([name, delta]) => {
			const fillSize = Math.min(delta, remainingSize);
			sizes[name] += fillSize;
			remainingSize -= fillSize;
		});
	};

	let panels: PanelDelta[] = [];

	// 2.
	// Next, we determine which panels were added, removed and existing
	const addedPanels =
		previousOrder.length > 0
			? order.filter((name) => !previousOrder.includes(name))
			: order;

	const removedPanels =
		previousOrder.length > 0
			? previousOrder.filter((name) => !order.includes(name))
			: [];

	const existingPanels =
		previousOrder.length > 0
			? order.filter((name) => previousOrder.includes(name))
			: [];

	// 3.
	// If there are existing panels, we want to maintain their sizes as much as
	// possible between renders, so we need to check which of these panels are
	// still on the page, and what their previous sizes were. Since these sizes
	// couldh ave restored from localstorage, we want to also make sure that we
	// cap it using the `maxSize` as well
	if (existingPanels.length) {
		panels = existingPanels
			.map<PanelDelta>((name) => [
				name,
				Math.min(previousSizes[name], configs[name].maxSize) - sizes[name],
			])
			.sort((a, b) => b[1] - a[1]);
		priorityDistribute(panels);
	}

	// 4.
	// At this point we're dealing only with new panels, whether it's a fresh
	// render or users are going from page to page, whatever width we have we want
	// to distribute in a somewhat logical manner. We'll create sets of panels and
	// deltas to then distribute widths based on, either evenly or "outward"
	// depending on the scenario
	if (addedPanels.length && remainingSize) {
		panels = addedPanels
			.filter((name) => configs[name].defaultSize !== Infinity)
			.map<PanelDelta>((name) => [
				name,
				configs[name].defaultSize - sizes[name],
			])
			.sort((a, b) => a[1] - b[1]);
		evenDistribute(panels);

		// -> Then we deal with panels that have an infinite `defaultSize`
		panels = addedPanels
			.filter((name) => configs[name].defaultSize === Infinity)
			.map<PanelDelta>((name) => [name, Infinity]);
		evenDistribute(panels);

		// -> And finally fill panels up to their maxSize
		panels = addedPanels
			.map<PanelDelta>((name) => [name, configs[name].maxSize - sizes[name]])
			.sort((a, b) => a[1] - b[1]);
		evenDistribute(panels);
	}

	if (removedPanels.length && remainingSize) {
		console.log('handle removed panels', remainingSize, removedPanels);

		// previous index of the removed panel
		const panelIndex = Math.max(
			...removedPanels.map((name) => previousOrder.indexOf(name)),
		);

		panels = [
			...order.slice(panelIndex),
			...order.slice(0, panelIndex).reverse(),
		].map((name) => [name, configs[name].maxSize - sizes[name]]);
		priorityDistribute(panels);
	}

	//
	//
	//
	//
	//
	//
	//
	// remainingSize -= requiredSize;
	// console.log('REQUIRED SIZE', requiredSize);

	// const existingSize = sum(Object.values(existingSizes));
	// if (existingSize > 0) {
	// 	if (requiredSize > availableSize - existingSize) {
	// 		console.log(
	// 			'existing panels need to shrink by',
	// 			Math.abs(availableSize - existingSize - requiredSize),
	// 		);

	// 		// check which panel was added
	// 		const addedPanel = Math.max(
	// 			...order
	// 				.filter((name) => !previousOrder.includes(name))
	// 				.map((name) => order.indexOf(name)),
	// 		);
	// 		// remove width from panels to the right of the added panel first
	// 		let panels = order.slice(addedPanel + 1);
	// 		console.log('after panels', panels);

	// 		panels = order.slice(0, addedPanel);
	// 		console.log('before panels', panels);
	// 		// // compare each existing panel's existing width to its default width
	// 		// const stuff = Object.entries(existingSizes)
	// 		// 	.map(([name, size]) => [name, configs[name].minSize - size] as const)
	// 		// 	.sort((a, b) => a[1] - b[1])
	// 		// 	.forEach(([name, delta]) => {
	// 		// 		console.log(name, delta);
	// 		// 	});

	// 		// console.log(stuff);
	// 	} else {
	// 		Object.entries(existingSizes).forEach(([name, size]) => {
	// 			sizes[name] = size;
	// 		});
	// 		remainingSize = availableSize - sum(Object.values(sizes));
	// 	}
	// }

	// const distribute = (names: string[], property: 'defaultSize' | 'maxSize') => {
	// 	if (!remainingSize) return;
	// 	let remainingCount = names.length;
	// 	names
	// 		.map((name) => [name, configs[name][property] - sizes[name]] as const)
	// 		.sort((a, b) => a[1] - b[1])
	// 		.forEach(([name, delta]) => {
	// 			const averageSize = Math.round(remainingSize / remainingCount);
	// 			const fillSize = Math.min(delta, averageSize);

	// 			sizes[name] += fillSize;
	// 			remainingSize -= fillSize;
	// 			remainingCount--;
	// 		});
	// };

	// // mutate all panels that have a default size
	// let panels = newPanels.filter(
	// 	(name) => configs[name].defaultSize !== Infinity,
	// );
	// distribute(panels, 'defaultSize');

	// // now all panel numbers that do NOT have a default size
	// panels = newPanels.filter((name) => configs[name].defaultSize === Infinity);
	// distribute(panels, 'maxSize');

	// // if we still have remaining size, we need to mess with existing panels
	// if (remainingSize > 0) {
	// 	// check which panels disappeared, get the furthest right / down one
	// 	const removedPanel = Math.max(
	// 		...previousOrder
	// 			.map((name, i) => [i, name] as const)
	// 			.filter(([, name]) => !configs[name])
	// 			.map(([i]) => i),
	// 	);

	// 	// then get all panels after the removed one
	// 	panels = order.slice(removedPanel);
	// 	distribute(panels, 'maxSize');

	// 	// then all panels before the removed one and do the same thing there
	// 	panels = order.slice(0, removedPanel);
	// 	distribute(panels, 'maxSize');
	// }

	return sizes;
}
