import { PanelGroup } from '@/core/panels';

import { DTPProvider } from '@/tickets/dtp';
import { TicketsNavbarPanel } from '@/tickets/navigation';

import TicketsLayout from './TicketsLayout';
import css from './Tickets.module.css';

export default function Tickets() {
	return (
		<DTPProvider>
			<TicketsNavbarPanel />
			<PanelGroup className={css.panelGroup} subtractSize={10}>
				<TicketsLayout />
			</PanelGroup>
		</DTPProvider>
	);
}
