import { useCallback, useState } from 'react';
import { Route, Switch } from 'wouter';

import { Panel } from '@/common/panels';

import TicketDetail from './TicketDetail';
import TicketsList from './TicketsList';
import TicketsNav from './TicketsNav';

const navPanelConfig = {
	initialSize: 300,
	minSize: 200,
	maxSize: 400,
};

const listPanelConfig = {
	initialSize: 300,
	minSize: 200,
	maxSize: 400,
};

const detailPanelConfig = {
	initialSize: 400,
	minSize: 400,
	maxSize: Infinity,
};

export default function Tickets() {
	const [shouldShowList, setShouldShowList] = useState(true);

	const handleToggleTicketList = useCallback(() => {
		setShouldShowList((s) => !s);
	}, []);

	return (
		<>
			<Panel config={navPanelConfig}>
				<TicketsNav onToggleTicketList={handleToggleTicketList} />
			</Panel>
			{shouldShowList && (
				<Panel config={listPanelConfig}>
					<TicketsList />
				</Panel>
			)}
			<Switch>
				<Route path=":ticketId">
					<Panel config={detailPanelConfig}>
						<TicketDetail />
					</Panel>
				</Route>
			</Switch>
		</>
	);
}
