import { useMemo } from 'react';
import { useToggle } from '@/core/hooks';

export default function useContextValue() {
	const [isOpen, onToggle] = useToggle(true);

	return useMemo(() => ({ isOpen, onToggle }), [isOpen, onToggle]);
}
