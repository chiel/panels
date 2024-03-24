import { Children, cloneElement, ReactElement } from 'react';

import css from './Panels.module.css';

type Props = {
	children: ReactElement | ReactElement[];
	widths: number[];
};

export default function Panels({ children, widths }: Props) {
	const totalWidth = widths.reduce((acc, w) => acc + w, 0);

	return (
		<div className={css.container} style={{ width: totalWidth }}>
			{Children.map(children, (child, index) =>
				cloneElement(child, {
					width: widths[index],
				}),
			)}
		</div>
	);
}