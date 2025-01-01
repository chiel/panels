import { Route, Switch } from 'wouter';

import { useViewportSize } from '@/core/hooks';
import { GlobalNavigationPanel } from '@/core/navigation';
import { Panels } from '@/core/panels';
import { Tickets } from '@/tickets/main/pages';

import css from './App.module.css';

export default function App() {
	const [width] = useViewportSize();

	return (
		<div className={css.container}>
			<Panels size={width}>
				<GlobalNavigationPanel />
				<Switch>
					<Route path="/">
						<p>home</p>
					</Route>
					<Route path="/tickets" nest>
						<Tickets />
					</Route>
					<Route path="/settings">
						<p>settings</p>
					</Route>
				</Switch>
			</Panels>
		</div>
	);
}
