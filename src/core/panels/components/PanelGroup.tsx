import cn from 'classnames';
import type { ReactNode } from 'react';

import usePanelGroup from '../hooks/usePanelGroup';
import css from './PanelGroup.module.css';

type Props = {
	children: ReactNode;
	className?: string;
	subtractSize?: number;
};

export default function PanelGroup({
	children,
	className,
	subtractSize,
}: Props) {
	usePanelGroup(subtractSize);
	return <div className={cn(css.panelGroup, className)}>{children}</div>;
}
