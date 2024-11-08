import type { MouseEvent } from 'react';

export type OnResizeStart = (e: MouseEvent) => void;
export type Listener = (
	newSize: number,
	onResizeStart: OnResizeStart | null,
) => void;
export type Unsubscribe = () => void;

export type Drag = {
	handle: number;
	position: { x: number; y: number };
	sizes: number[];
};

export type PanelClient = {
	subscribe: (listener: Listener) => Unsubscribe;
	unmount: () => void;
};

export type PanelConfig = {
	initialSize: number;
	maxSize: number;
	minSize: number;
};
