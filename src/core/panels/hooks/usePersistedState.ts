import { useCallback, useMemo, useRef, useState } from 'react';

export default function usePersistedState<T>(key: string, initialValue: T) {
	const savedRawValue = useRef<Record<string, number> | null>(null);
	if (!savedRawValue.current) {
		const rawValue = localStorage.getItem(key);
		if (rawValue === null) {
			savedRawValue.current = {};
		} else {
			console.log('ye', rawValue);
		}
	}

	const [state, setState] = useState<T>(initialValue);
	const updateState = useCallback((newState: T) => {
		console.log('update state', key, newState);
		setState(newState);
	}, []);

	return useMemo(() => [state, updateState] as const, [state, updateState]);
}
