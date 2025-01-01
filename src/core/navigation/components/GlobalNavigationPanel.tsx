import { Panel } from '@/core/panels';

import GlobalNavigation from './GlobalNavigation';

const panelConfig = {
	defaultSize: 49,
	minSize: 49,
	maxSize: 49,
};

export default function GlobalNavigationPanel() {
	return (
		<Panel config={panelConfig} name="global-navigation">
			<GlobalNavigation />
		</Panel>
	);
}
