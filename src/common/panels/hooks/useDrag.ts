import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

export type Drag = {
	handle: number;
	position: { x: number; y: number };
	sizes: number[];
};

export default function useDrag(sizes: number[]) {
	const [drag, setDrag] = useState<Drag | null>(null);

	const createOnResizeStart = useCallback(
		(index: number) => (e: MouseEvent) => {
			e.preventDefault();
			setDrag({
				handle: index,
				position: { x: e.clientX, y: e.clientY },
				sizes,
			});
		},
		[sizes],
	);

	useEffect(() => {
		if (!drag) return;

		function handleMouseUp() {
			setDrag(null);
		}

		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [drag]);

	return useMemo(
		() => ({ createOnResizeStart, drag }),
		[createOnResizeStart, drag],
	);
}
