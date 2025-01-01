import { Panel } from '@/core/panels';

import TicketDetail from './TicketDetail';

const panelConfig = {
	defaultSize: Infinity,
	minSize: 400,
	maxSize: Infinity,
};

export default function TicketDetailPanel() {
	return (
		<Panel config={panelConfig} name="ticket-detail">
			<TicketDetail />
		</Panel>
	);
}
