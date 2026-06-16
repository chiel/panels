export default function getPanelNames(elements: Element[]) {
	return elements
		.map((el) => el.getAttribute('data-panel-name'))
		.filter((name) => name !== null);
}
