import css from './GlobalNavigation.module.css';
import Item from './Item';
import NavbarToggle from './NavbarToggle';

export default function GlobalNavigation() {
	return (
		<nav className={css.globalNavigation}>
			<section className={css.section}>
				<div className={css.items}>
					<NavbarToggle />
					<Item icon="home" url="/" />
					<Item icon="search" />
					<Item icon="notifications" />
				</div>
				<hr className={css.separator} />
				<div className={css.items}>
					<Item icon="forum" url="/tickets" />
					<Item icon="group" url="/customers" />
					<Item icon="bolt" url="/automate" />
					<Item icon="attach_money" url="/convert" />
				</div>
			</section>
			<section className={css.section}>
				<div className={css.items}>
					<Item icon="settings" url="/settings" />
					<Item icon="account_circle" />
				</div>
			</section>
		</nav>
	);
}
