import { MouseEvent } from 'react';

import css from './Handle.module.css';

type Props = {
	onResizeStart: (e: MouseEvent) => void;
};

export default function Handle({ onResizeStart }: Props) {
	return <div className={css.handle} onMouseDown={onResizeStart} />;
}
