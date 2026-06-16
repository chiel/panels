import { createContext } from 'react';

import type usePanelsContext from './hooks/usePanelsContext';

export type PanelsContextValue = ReturnType<typeof usePanelsContext>;

export const PanelsContext = createContext<PanelsContextValue | null>(null);
