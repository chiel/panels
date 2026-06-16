import { useState } from 'react';

import { Panel, PanelGroup, Panels } from '@/common/panels';
import Handle from '@/common/panels/components/Handle';

import css from './App.module.css';

export default function App() {
	const [showTwo, setShowTwo] = useState(true);
	const [showFour, setShowFour] = useState(true);

	return (
		<div className={css.container}>
			<Panels>
				<Panel
					name="one"
					config={{ defaultSize: 250, minSize: 150, maxSize: 250 }}
				>
					<div className={css.content}>
						<p className={css.panelNumber}>1</p>
						<button
							className={css.button}
							onClick={() => setShowTwo((v) => !v)}
						>
							{showTwo ? 'Hide' : 'Show'} Panel 2
						</button>
					</div>
				</Panel>
				{showTwo && (
					<>
						<Handle />
						<Panel
							name="two"
							config={{ defaultSize: 200, minSize: 150, maxSize: 250 }}
						>
							<div className={css.content}>
								<p className={css.panelNumber}>2</p>
							</div>
						</Panel>
					</>
				)}
				<Handle className={css.handle} />
				<PanelGroup className={css.group} reduceSizeBy={12}>
					<Panel name="three" config={{ minSize: 100 }}>
						<div className={css.content}>
							<p className={css.panelNumber}>3</p>
							<button
								className={css.button}
								onClick={() => setShowFour((v) => !v)}
							>
								{showFour ? 'Hide' : 'Show'} Panel 4
							</button>
						</div>
					</Panel>
					{showFour && (
						<>
							<Handle />
							<Panel name="four" config={{ minSize: 100, maxSize: 0.25 }}>
								<div className={css.content}>
									<p className={css.panelNumber}>4</p>
								</div>
							</Panel>
						</>
					)}
				</PanelGroup>
			</Panels>
		</div>
	);
}
