import { useParams } from 'wouter';

import css from './TicketDetail.module.css';

export default function TicketDetail() {
	const { ticketId } = useParams<{ ticketId: string }>();

	return <div className={css.container}>ticket {ticketId} detail</div>;
}
