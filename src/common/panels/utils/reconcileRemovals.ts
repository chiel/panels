import type { FinalPanelConfig } from './finaliseConfigs';

type Removal = {
	index: number;
	name: string;
};

type Options = {
	configs: Record<string, FinalPanelConfig>;
	previousPanels: string[];
	removals: Removal[];
	sizes: Record<string, number>;
};

export default function reconcileRemovals({
	configs,
	previousPanels,
	removals,
	sizes,
}: Options) {
	const newSizes = { ...sizes };

	removals.forEach(({ name, index }) => {
		const freed = newSizes[name] ?? 0;
		delete newSizes[name];

		const neighbors = [
			...previousPanels.slice(0, index).reverse(),
			...previousPanels.slice(index + 1),
		]
			.filter((n) => n in newSizes && n in configs)
			.sort((a, b) => {
				const roomA = configs[a].maxSize - newSizes[a];
				const roomB = configs[b].maxSize - newSizes[b];
				return roomB - roomA;
			});

		let remaining = freed;

		neighbors.forEach((neighbor) => {
			if (remaining <= 0) return;

			const { maxSize } = configs[neighbor];
			const current = newSizes[neighbor];
			const give = Math.min(remaining, maxSize - current);

			newSizes[neighbor] = current + give;
			remaining -= give;
		});
	});

	return newSizes;
}
