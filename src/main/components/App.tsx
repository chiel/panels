import { Route, Switch } from 'wouter';

import { useViewportSize } from '@/common/hooks';
import { Panel, Panels } from '@/common/panels';
// import type { PanelsConfig } from '@/common/panels';
import { Home } from '@/home';
import { Tickets } from '@/tickets';

import Navigation from './Navigation';
import css from './App.module.css';

const navigationPanelConfig = {
	minSize: 100,
	maxSize: 100,
	initialSize: 100,
};

export default function App() {
	const [width] = useViewportSize();

	return (
		<div className={css.container}>
			<Panels size={width}>
				<Panel key="global-nav" config={navigationPanelConfig}>
					<Navigation />
				</Panel>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
					<Route path="/tickets" nest>
						<Tickets />
					</Route>
					{/*
					<Route path="/settings">
						<SettingsRoutes />
					</Route>
					*/}
				</Switch>
			</Panels>
		</div>
	);
}
