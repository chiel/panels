import { OnResizeStart } from '../types';

import css from './Handle.module.css';

type Props = {
	onResizeStart: OnResizeStart;
};

export default function Handle({ onResizeStart }: Props) {
	return <div className={css.handle} onMouseDown={onResizeStart} />;
}
