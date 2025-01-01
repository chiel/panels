import { Panel } from '@/core/panels';

import EmptyTicket from './EmptyTicket';

const panelConfig = {
	defaultSize: Infinity,
	minSize: 200,
	maxSize: Infinity,
};

export default function EmptyTicketPanel() {
	return (
		<Panel config={panelConfig} name="empty-ticket">
			<EmptyTicket />
		</Panel>
	);
}
