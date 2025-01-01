import type { ComponentProps } from 'react';

import useNavigation from '../hooks/useNavigation';
import Navbar from './Navbar';

type Props = ComponentProps<typeof Navbar>;

export default function CollapsibleNavbar(props: Props) {
	const { isOpen } = useNavigation();

	if (isOpen) {
		return <Navbar {...props} />;
	}

	return null;
}
