import { useEffect, useRef, useState } from 'react';

import type { PanelConfig } from '../types';
import calculateSizes from '../utils/calculateSizes';

export default function useSizes(
	availableSize: number,
	configs: PanelConfig[],
) {
	const previousConfigs = useRef<PanelConfig[]>([]);
	const [sizes, setSizes] = useState<number[]>([]);

	useEffect(() => {
		if (!configs.length) return;

		calculateSizes({
			availableSize,
			configs,
			previousConfigs: previousConfigs.current,
			sizes,
		});

		setSizes(configs.map((config) => config.initialSize));
		previousConfigs.current = configs;
	}, [availableSize, configs]);

	return [sizes, setSizes] as const;
}
