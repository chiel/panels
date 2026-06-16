import css from './Handle.module.css';

type Props = {
	className?: string;
};

export default function Handle({ className }: Props) {
	return <div className={`${css.handle} ${className ?? ''}`} data-handle />;
}
