import { Navbar, NavbarLink } from '@/core/navigation';
import { DTPToggle } from '@/tickets/dtp';

export default function TicketsNavbar() {
	return (
		<Navbar title="Tickets" titleSuffix={<DTPToggle />}>
			<NavbarLink to="/1">Inbox</NavbarLink>
			<NavbarLink to="/2">Urgent</NavbarLink>
		</Navbar>
	);
}
