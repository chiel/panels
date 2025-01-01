import { useEffect, useState } from 'react';

import type { Drag } from './useDrag';

type Delta = {
	x: number;
	y: number;
};

export default function useDelta(drag: Drag | null) {
	const [delta, setDelta] = useState<Delta | null>(null);

	useEffect(() => {
		if (!drag) {
			setDelta(null);
			return;
		}

		function handleMouseMove(e: MouseEvent) {
			if (!drag) return;
			setDelta({
				x: e.clientX - drag.position.x,
				y: e.clientY - drag.position.y,
			});
		}

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [drag]);

	return delta;
}
