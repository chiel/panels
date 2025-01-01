import useNavigation from '../hooks/useNavigation';
import Item from './Item';

export default function NavbarToggle() {
	const { isOpen, onToggle } = useNavigation();

	return <Item icon={isOpen ? 'menu' : 'double_arrow'} onClick={onToggle} />;
}
