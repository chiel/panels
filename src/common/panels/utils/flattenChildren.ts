export default function flattenChildren(container: HTMLElement): Element[] {
	const result: Element[] = [];

	[...container.children].forEach((child) => {
		if (child instanceof HTMLElement && 'panelGroup' in child.dataset) {
			result.push(...flattenChildren(child));
		} else {
			result.push(child);
		}
	});

	return result;
}
