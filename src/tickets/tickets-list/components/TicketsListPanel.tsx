import { Panel } from '@/core/panels';

import TicketsList from './TicketsList';

const panelConfig = {
	defaultSize: 300,
	minSize: 250,
	maxSize: 400,
};

export default function TicketsListPanel() {
	return (
		<Panel config={panelConfig} name="tickets-list">
			<TicketsList />
		</Panel>
	);
}
