import { Panel } from '@/core/panels';

import TicketInfobar from './TicketInfobar';

const panelConfig = {
	defaultSize: 300,
	minSize: 300,
	maxSize: 0.5,
};

export default function TicketInfobarPanel() {
	return (
		<Panel config={panelConfig} name="ticket-infobar">
			<TicketInfobar />
		</Panel>
	);
}
