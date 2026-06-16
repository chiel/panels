import { ReactNode, useLayoutEffect } from 'react';

import usePanels from '../hooks/usePanels';

import css from './PanelGroup.module.css';

type Props = {
	children: ReactNode;
	className?: string;
	reduceSizeBy?: number;
};

export default function PanelGroup({
	children,
	className,
	reduceSizeBy = 0,
}: Props) {
	const panels = usePanels();

	useLayoutEffect(() => {
		return panels.addPanelGroup(reduceSizeBy);
	}, [panels, reduceSizeBy]);

	return (
		<div className={`${css.container} ${className ?? ''}`} data-panel-group>
			{children}
		</div>
	);
}
