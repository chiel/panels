import { Link } from 'wouter';

import css from './Navigation.module.css';

export default function Navigation() {
	return (
		<nav className={css.container}>
			<Link to="/">Home</Link>
			<Link to="/tickets">Tickets</Link>
			<Link to="/settings">Settings</Link>
		</nav>
	);
}
