import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';

export type Drag = {
	handle: number;
	position: { x: number; y: number };
	sizes: Record<string, number>;
};

export default function useDrag(sizes: Record<string, number>) {
	const [drag, setDrag] = useState<Drag | null>(null);

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

	const createResizer = useCallback(
		(i: number) => (e: MouseEvent) => {
			e.preventDefault();
			setDrag({ handle: i, position: { x: e.clientX, y: e.clientY }, sizes });
		},
		[sizes],
	);

	return useMemo(() => ({ createResizer, drag }), [createResizer, drag]);
}
