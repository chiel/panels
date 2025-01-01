import { Link } from 'wouter';

import { Icon } from '@/core/ui';

import css from './Item.module.css';

type BaseProps = {
	icon: string;
};

type ButtonProps = BaseProps & { onClick?: () => void };
type LinkProps = BaseProps & { url: string };

type Props = ButtonProps | LinkProps;

export default function Item({ icon, ...props }: Props) {
	if ('url' in props) {
		const { url } = props;
		return (
			<Link className={css.item} to={url}>
				<Icon name={icon} />
			</Link>
		);
	}

	const { onClick } = props;
	return (
		<button className={css.item} type="button" onClick={onClick}>
			<Icon name={icon} />
		</button>
	);
}
