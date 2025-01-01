import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, timeout: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, timeout);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [timeout, value]);

	return debouncedValue;
}
