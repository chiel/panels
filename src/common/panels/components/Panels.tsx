import { Children, cloneElement, MouseEvent, ReactElement } from 'react';

import Handle from './Handle';
import css from './Panels.module.css';

type Props = {
	children: ReactElement | ReactElement[];
	onResizeStartHandlers: ((e: MouseEvent) => void)[];
	widths: number[];
};

export default function Panels({
	children,
	onResizeStartHandlers,
	widths,
}: Props) {
	const totalWidth = widths.reduce((acc, w) => acc + w, 0);

	return (
		<div className={css.container} style={{ width: totalWidth }}>
			{Children.map(children, (child, index) => (
				<>
					{index > 0 && (
						<Handle onResizeStart={onResizeStartHandlers[index - 1]} />
					)}
					{cloneElement(child, { width: widths[index] })}
				</>
			))}
		</div>
	);
}
