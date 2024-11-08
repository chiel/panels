import { createContext } from 'react';

import usePanels from './hooks/usePanels';

type ContextValue = ReturnType<typeof usePanels>;

export default createContext<ContextValue | null>(null);
