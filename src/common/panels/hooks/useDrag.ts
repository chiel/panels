import { useLayoutEffect, useState } from 'react';

export type Drag = {
	handle: HTMLElement;
	position: { x: number; y: number };
	sizes: Record<string, number>;
};

export default function useDrag(
	container: HTMLDivElement | null,
	sizes: Record<string, number>,
) {
	const [drag, setDrag] = useState<Drag | null>(null);

	useLayoutEffect(() => {
		if (!container) return;

		const onMouseDown = (e: MouseEvent) => {
			if (!(e.target instanceof HTMLElement)) return;

			const handle = e.target.closest('[data-handle]');
			if (!handle || !(handle instanceof HTMLElement)) return;

			e.preventDefault();
			setDrag({
				handle,
				position: { x: e.clientX, y: e.clientY },
				sizes,
			});
		};

		container.addEventListener('mousedown', onMouseDown);
		return () => container.removeEventListener('mousedown', onMouseDown);
	}, [container, sizes]);

	useLayoutEffect(() => {
		if (!drag) return;

		drag.handle.setAttribute('data-active', '');
		document.body.style.cursor = 'ew-resize';

		function handleMouseUp() {
			setDrag(null);
		}

		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			drag.handle.removeAttribute('data-active');
			document.body.style.cursor = '';
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [drag]);

	return drag;
}
