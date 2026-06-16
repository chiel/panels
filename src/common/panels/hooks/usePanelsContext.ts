import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { PanelConfig } from '../types';

import finaliseConfigs from '../utils/finaliseConfigs';
import flattenChildren from '../utils/flattenChildren';
import mutateSizes from '../utils/mutateSizes';

import useDelta from './useDelta';
import useDrag from './useDrag';
import useElementSize from './useElementSize';
import useSizes from './useSizes';

export default function usePanelsContext(container: HTMLDivElement | null) {
	const [configs, setConfigs] = useState<Record<string, PanelConfig>>({});
	const [reservedSize, setReservedSize] = useState(0);
	const { width: availableSize } = useElementSize(container);
	const effectiveSize = Math.max(0, availableSize - reservedSize);
	const finalConfigs = useMemo(
		() => finaliseConfigs(effectiveSize, configs),
		[effectiveSize, configs],
	);

	const allPanelSizes = useRef<Record<string, number>>({});
	const [sizes, setSizes, ready] = useSizes(
		availableSize,
		effectiveSize,
		finalConfigs,
		allPanelSizes,
	);
	const drag = useDrag(container, sizes);
	const prevDrag = useRef(drag);
	const delta = useDelta(drag);

	useLayoutEffect(() => {
		if (prevDrag.current && !drag) {
			Object.assign(allPanelSizes.current, sizes);
		}
		prevDrag.current = drag;
	}, [drag, sizes]);

	useLayoutEffect(() => {
		if (!container || !drag || delta === null) return;

		setSizes(
			mutateSizes({
				children: flattenChildren(container),
				configs: finalConfigs,
				delta,
				drag,
			}),
		);
	}, [finalConfigs, container, delta, drag, setSizes]);

	useLayoutEffect(() => {
		if (!container) return;

		flattenChildren(container).forEach((child) => {
			if (!(child instanceof HTMLElement)) return;
			const name = child.dataset.panelName;
			if (!name || !(name in sizes)) return;
			child.style.width = `${sizes[name]}px`;
		});
	}, [container, sizes]);

	const addPanelGroup = useCallback((reduceSizeBy: number) => {
		setReservedSize((prev) => prev + reduceSizeBy);
		return () => {
			setReservedSize((prev) => prev - reduceSizeBy);
		};
	}, []);

	const addPanel = useCallback((name: string, config: PanelConfig) => {
		setConfigs((prev) => ({ ...prev, [name]: config }));

		return () => {
			setConfigs((prev) => {
				const nextState = { ...prev };
				delete nextState[name];
				return nextState;
			});
		};
	}, []);

	return useMemo(
		() => ({ addPanel, addPanelGroup, ready }),
		[addPanel, addPanelGroup, ready],
	);
}
