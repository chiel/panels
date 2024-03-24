import { useViewportSize } from '@/common/hooks';
import { Panel, Panels, usePanels } from '@/common/panels';
import type { PanelsConfig } from '@/common/panels';

import css from './App.module.css';

const panelsConfig: PanelsConfig = [
	{ initialWidth: 250, minWidth: 150, maxWidth: 250 },
	{ initialWidth: 200, minWidth: 150, maxWidth: 250 },
	{ minWidth: 100 },
	{ minWidth: 100, maxWidth: 0.4 },
];

export default function App() {
	const [width] = useViewportSize();
	const panelsProps = usePanels(width, panelsConfig);

	const { widths } = panelsProps;

	return (
		<div className={css.container}>
			<Panels {...panelsProps}>
				<Panel>
					<div
						className={css.content}
						style={{ background: 'rgba(255, 0, 0, .1)' }}
					>
						<p className={css.panelNumber}>1</p>
						<p>{widths[0]}</p>
					</div>
				</Panel>
				<Panel>
					<div
						className={css.content}
						style={{ background: 'rgba(0, 255, 0, .1)' }}
					>
						<p className={css.panelNumber}>2</p>
						<p>{widths[1]}</p>
					</div>
				</Panel>
				<Panel>
					<div
						className={css.content}
						style={{ background: 'rgba(0, 0, 255, .1)' }}
					>
						<p className={css.panelNumber}>3</p>
						<p>{widths[2]}</p>
					</div>
				</Panel>
				<Panel>
					<div
						className={css.content}
						style={{ background: 'rgba(255, 128, 128, .1)' }}
					>
						<p className={css.panelNumber}>4</p>
						<p>{widths[3]}</p>
					</div>
				</Panel>
			</Panels>
		</div>
	);
}
