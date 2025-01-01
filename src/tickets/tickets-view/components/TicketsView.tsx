import { Link, useParams } from 'wouter';

import css from './TicketsView.module.css';

export default function TicketsView() {
	const { viewId } = useParams<{ viewId?: string }>();

	return (
		<div className={css.view}>
			<header className={css.header}>view id: {viewId}</header>
			<div className={css.content}>
				<Link className={css.ticket} to="/1">
					ticket 1
				</Link>
				<Link className={css.ticket} to="/2">
					ticket 2
				</Link>
				<Link className={css.ticket} to="/3">
					ticket 3
				</Link>
			</div>
		</div>
	);
}
