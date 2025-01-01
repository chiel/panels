import { useToggle } from '@/core/hooks';

export default function useContextValue() {
	return useToggle(false);
}
