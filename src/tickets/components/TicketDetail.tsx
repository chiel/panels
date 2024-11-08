import { useParams } from 'wouter';

export default function TicketDetail() {
	const { ticketId } = useParams<{ ticketId: string }>();

	return (
		<div>
			<h1>ticket {ticketId}</h1>
		</div>
	);
}
