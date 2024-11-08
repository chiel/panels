import { Link } from 'wouter';

export default function TicketsList() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/1">ticket 1</Link>
				</li>
				<li>
					<Link to="/2">ticket 2</Link>
				</li>
				<li>
					<Link to="/3">ticket 3</Link>
				</li>
			</ul>
		</nav>
	);
}
