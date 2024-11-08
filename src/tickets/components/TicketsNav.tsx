import { memo } from 'react';

type Props = {
	onToggleTicketList: () => void;
};

export default function TicketsNav({ onToggleTicketList }: Props) {
	return (
		<div>
			<p>tickets nav</p>
			<button type="button" onClick={onToggleTicketList}>
				toggle
			</button>
		</div>
	);
}
