import type { ReactNode } from 'react';

import usePanel from '../hooks/usePanel';
import type { PanelConfig } from '../types';

import css from './Panel.module.css';

type Props = {
	children: ReactNode;
	config: PanelConfig;
	name: string;
};

export default function Panel({ children, config, name }: Props) {
	usePanel(name, config);

	return (
		<div className={css.container} data-panel-name={name}>
			{children}
		</div>
	);
}
