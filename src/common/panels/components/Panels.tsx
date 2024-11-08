import type { ReactNode } from 'react';
import { useState } from 'react';

import Context from '../Context';
import usePanels from '../hooks/usePanels';

import css from './Panels.module.css';

type Props = {
	children: ReactNode;
	size: number;
};

export default function Panels({ children, size }: Props) {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const ctx = usePanels(container, size);

	return (
		<Context.Provider value={ctx}>
			<div ref={setContainer} className={css.container}>
				{children}
			</div>
		</Context.Provider>
	);
}
