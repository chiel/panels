import type { ReactNode } from 'react';

import Context from '../Context';
import useContextValue from '../hooks/useContextValue';

type Props = {
	children: ReactNode;
};

export default function Provider({ children }: Props) {
	const ctx = useContextValue();
	return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
