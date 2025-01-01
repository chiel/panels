import type { ReactNode } from 'react';

import { Panel } from '@/core/panels';

import useNavigation from '../hooks/useNavigation';

const panelConfig = {
	defaultSize: 250,
	minSize: 150,
	maxSize: 350,
};

type Props = {
	children: ReactNode;
};

export default function NavbarPanel({ children }: Props) {
	const { isOpen } = useNavigation();

	if (isOpen) {
		return (
			<Panel config={panelConfig} name="navbar">
				{children}
			</Panel>
		);
	}

	return null;
}
