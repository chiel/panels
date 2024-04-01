import { useEffect, useState } from 'react';

import { Drag } from './useDrag';

export default function useDelta(drag: Drag | null) {
	const [delta, setDelta] = useState<number | null>(null);

	useEffect(() => {
		if (!drag) {
			setDelta(null);
			return;
		}

		function handleMouseMove(e: MouseEvent) {
			if (!drag) return;
			setDelta(e.clientX - drag.position.x);
		}

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [drag]);

	return delta;
}
