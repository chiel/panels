import { Panel } from '@/common/panels';

const homePanelConfig = {
	minSize: 300,
	maxSize: Infinity,
	initialSize: 400,
};

export default function Home() {
	return (
		<Panel config={homePanelConfig}>
			<div>HOME</div>
		</Panel>
	);
}
