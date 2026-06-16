import { ReactNode, useState } from 'react';

import { PanelsContext } from '../PanelsContext';
import usePanelsContext from '../hooks/usePanelsContext';

import css from './Panels.module.css';

type Props = {
	children: ReactNode;
};

export default function Panels({ children }: Props) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const panelsContext = usePanelsContext(container);

	return (
		<PanelsContext.Provider value={panelsContext}>
			<div
				ref={setContainer}
				className={css.container}
				style={{ visibility: panelsContext.ready ? 'visible' : 'hidden' }}
			>
				{children}
			</div>
		</PanelsContext.Provider>
	);
}
