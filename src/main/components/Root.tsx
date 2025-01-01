import App from '@/main/components/App';
import { NavigationProvider } from '@/core/navigation';

import './global.css';

export default function Root() {
	return (
		<NavigationProvider>
			<App />
		</NavigationProvider>
	);
}
