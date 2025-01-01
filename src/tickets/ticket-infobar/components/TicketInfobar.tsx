import { useParams } from 'wouter';

import css from './TicketInfobar.module.css';

export default function TicketInfobar() {
	const { ticketId } = useParams<{ ticketId: string }>();

	return <div className={css.infobar}>ticket {ticketId} infobar</div>;
}
