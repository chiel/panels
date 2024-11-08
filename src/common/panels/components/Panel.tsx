import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import usePanel from '../hooks/usePanel';
import { PanelConfig } from '../types';

import Handle from './Handle';
import css from './Panel.module.css';

type Props = {
	children: ReactNode;
	config: PanelConfig;
};

export default function Panel({ children, config }: Props) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const { onResizeStart, size } = usePanel(container, config);
	const style = useMemo(() => ({ width: size }), [size]);

	return (
		<>
			<div ref={setContainer} className={css.container} style={style}>
				{children}
			</div>
			{!!onResizeStart && <Handle onResizeStart={onResizeStart} />}
		</>
	);
}
