export default function defaultOption<T>(
	givenValue: T | undefined,
	defaultValue: T,
) {
	return givenValue !== undefined ? givenValue : defaultValue;
}
