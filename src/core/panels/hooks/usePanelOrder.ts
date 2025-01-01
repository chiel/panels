import { useMemo } from 'react';

export default function usePanelOrder(
	container: HTMLDivElement | null,
	names: string[],
) {
	return useMemo(() => {
		if (!container) return [];

		const selectors = names.map((name) => `[data-panel-name="${name}"]`);
		if (!selectors.length) return [];

		return [...container.querySelectorAll(selectors.join(','))]
			.map((element) => element.getAttribute('data-panel-name'))
			.filter((el): el is string => !!el);
	}, [container, names]);
}
