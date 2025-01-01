import { Route, Switch } from 'wouter';

import { useDTP } from '@/tickets/dtp';

import { TicketDetailPanel } from '@/tickets/ticket-detail';
import { TicketInfobarPanel } from '@/tickets/ticket-infobar';
import { TicketsListPanel } from '@/tickets/tickets-list';
import { TicketsViewPanel } from '@/tickets/tickets-view';
import { EmptyTicketPanel } from '@/tickets/ui';

export default function TicketsLayout() {
	const [isEnabled] = useDTP();

	return (
		<Switch>
			<Route path="/:viewId?" nest>
				{isEnabled && <TicketsListPanel />}
				<Switch>
					<Route path="/:ticketId">
						<TicketDetailPanel />
						<TicketInfobarPanel />
					</Route>
					<Route>
						{isEnabled ? <EmptyTicketPanel /> : <TicketsViewPanel />}
					</Route>
				</Switch>
			</Route>
		</Switch>
	);
}
