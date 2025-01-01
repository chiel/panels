import { Icon } from '@/core/ui';

import useDTP from '../hooks/useDTP';
import css from './Toggle.module.css';

export default function Toggle() {
	const [isEnabled, onToggle] = useDTP();

	return (
		<button className={css.toggle} type="button" onClick={onToggle}>
			<Icon name={isEnabled ? 'left_panel_close' : 'left_panel_open'} />
		</button>
	);
}
