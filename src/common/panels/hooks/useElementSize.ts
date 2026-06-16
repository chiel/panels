import { useLayoutEffect, useState } from 'react';

export default function useElementSize(element: HTMLElement | null) {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		if (!element) return;

		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize({ width, height });
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [element]);

	return size;
}
