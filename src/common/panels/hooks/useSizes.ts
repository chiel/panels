import { useLayoutEffect, useRef, useState } from 'react';

import computeDefaultSizes from '../utils/computeDefaultSizes';
import type { FinalPanelConfig } from '../utils/finaliseConfigs';
import reconcileAdditions from '../utils/reconcileAdditions';
import reconcileRemovals from '../utils/reconcileRemovals';

export default function useSizes(
	availableSize: number,
	effectiveSize: number,
	configs: Record<string, FinalPanelConfig>,
	allPanelSizes: React.RefObject<Record<string, number>>,
) {
	const [sizes, setSizes] = useState(() =>
		computeDefaultSizes(effectiveSize, configs),
	);
	const [ready, setReady] = useState(false);
	const previousPanels = useRef<string[]>([]);

	useLayoutEffect(() => {
		const currentPanels = Object.keys(configs);

		if (currentPanels.length === 0 || availableSize === 0) return;

		if (previousPanels.current.length === 0) {
			const newSizes = computeDefaultSizes(effectiveSize, configs);
			setSizes(newSizes);
			setReady(true);
			Object.assign(allPanelSizes.current, newSizes);
		} else {
			const removed = previousPanels.current
				.map((name, index) => ({ name, index }))
				.filter(({ name }) => !currentPanels.includes(name));
			const added = currentPanels
				.map((name, index) => ({ name, index }))
				.filter(({ name }) => !previousPanels.current.includes(name));

			if (removed.length > 0) {
				const prevPanels = [...previousPanels.current];
				setSizes((sizes) =>
					reconcileRemovals({
						configs,
						previousPanels: prevPanels,
						removals: removed,
						sizes,
					}),
				);
			}

			if (added.length > 0) {
				setSizes((sizes) => {
					const newSizes = reconcileAdditions({
						additions: added,
						allPanelSizes: allPanelSizes.current,
						configs,
						currentPanels,
						sizes,
					});
					Object.assign(allPanelSizes.current, newSizes);
					return newSizes;
				});
			}
		}

		previousPanels.current = currentPanels;
	}, [availableSize, effectiveSize, configs]);

	return [sizes, setSizes, ready] as const;
}
