import type { ReactNode } from 'react';

import css from './Navbar.module.css';

type Props = {
	children: ReactNode;
	title: string;
	titleSuffix?: ReactNode;
};

export default function Navbar({ children, title, titleSuffix }: Props) {
	return (
		<nav className={css.navbar}>
			<header className={css.header}>
				<p className={css.title}>{title}</p>
				{titleSuffix}
			</header>
			<section className={css.content}>{children}</section>
		</nav>
	);
}
