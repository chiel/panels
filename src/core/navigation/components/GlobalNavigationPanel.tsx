import { Panel } from '@/core/panels';

import GlobalNavigation from './GlobalNavigation';

const panelConfig = {
	defaultSize: 48,
	minSize: 48,
	maxSize: 48,
};

export default function GlobalNavigationPanel() {
	return (
		<Panel config={panelConfig} name="global-navigation">
			<GlobalNavigation />
		</Panel>
	);
}
