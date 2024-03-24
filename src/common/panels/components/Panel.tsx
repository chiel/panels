import { ReactNode, useMemo } from 'react';

import css from './Panel.module.css';

type Props = {
	children: ReactNode;
	width?: number;
};

export default function Panel({ children, width }: Props) {
	const style = useMemo(() => ({ width }), [width]);
	return (
		<div className={css.container} style={style}>
			{children}
		</div>
	);
}
