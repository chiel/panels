import type { FinalPanelConfig } from './finaliseConfigs';

type Addition = {
	index: number;
	name: string;
};

type Options = {
	additions: Addition[];
	allPanelSizes: Record<string, number>;
	configs: Record<string, FinalPanelConfig>;
	currentPanels: string[];
	sizes: Record<string, number>;
};

export default function reconcileAdditions({
	additions,
	allPanelSizes,
	configs,
	currentPanels,
	sizes,
}: Options) {
	const newSizes = { ...sizes };

	additions.forEach(({ name, index }) => {
		const { defaultSize, minSize } = configs[name];
		const previousSize = allPanelSizes[name];

		const availableRoom = Object.keys(newSizes).reduce(
			(acc, n) => acc + (newSizes[n] - (configs[n]?.minSize ?? 0)),
			0,
		);

		const preferred = previousSize ?? defaultSize;
		const targetSize = availableRoom >= preferred
			? preferred
			: availableRoom >= minSize
				? minSize
				: availableRoom;

		const neighbors = [
			...currentPanels.slice(0, index).reverse(),
			...currentPanels.slice(index + 1),
		]
			.filter((n) => n in newSizes && n in configs)
			.sort((a, b) => {
				const roomA = newSizes[a] - configs[a].minSize;
				const roomB = newSizes[b] - configs[b].minSize;
				return roomB - roomA;
			});

		let needed = targetSize;

		neighbors.forEach((neighbor) => {
			if (needed <= 0) return;

			const neighborMin = configs[neighbor].minSize;
			const current = newSizes[neighbor];
			const canShrink = current - neighborMin;
			const take = Math.min(needed, canShrink);

			newSizes[neighbor] = current - take;
			needed -= take;
		});

		newSizes[name] = targetSize - needed;
	});

	return newSizes;
}
