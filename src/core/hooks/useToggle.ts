import { useCallback, useMemo, useState } from 'react';

export default function useToggle(initialValue: boolean) {
	const [isEnabled, setIsEnabled] = useState(initialValue);

	const handleToggle = useCallback(() => {
		setIsEnabled((s) => !s);
	}, []);

	return useMemo(
		() => [isEnabled, handleToggle] as const,
		[handleToggle, isEnabled],
	);
}
