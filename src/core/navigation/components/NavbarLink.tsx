import cn from 'classnames';
import { Link } from 'wouter';
import type { LinkProps } from 'wouter';

import css from './NavbarLink.module.css';

type Props = {
	className?: string;
};

export default function NavbarLink({ className, ...props }: Props & LinkProps) {
	return <Link {...props} className={cn(css.link, className)} />;
}
