import { Panel } from '@/core/panels';

import TicketsView from './TicketsView';

const panelConfig = {
	defaultSize: Infinity,
	minSize: 400,
	maxSize: Infinity,
};

export default function TicketsViewPanel() {
	return (
		<Panel config={panelConfig} name="tickets-view">
			<TicketsView />
		</Panel>
	);
}
