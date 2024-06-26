import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/Root';

(() => {
	const rootEl = document.getElementById('root');
	if (!rootEl) throw new Error('Element #root not found.');

	const root = createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<Root />
		</React.StrictMode>,
	);
})();
