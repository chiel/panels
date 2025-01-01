import { createContext } from 'react';

import useContextValue from './hooks/useContextValue';

type ContextValue = ReturnType<typeof useContextValue>;

export default createContext<ContextValue | null>(null);
