export function denominatorDescription(components: { singular: string; plural: string }, count: number): string {
	if (count === 0) {
		return `No ${components.plural}`
	}

	if (count === 1) {
		return `${count} ${components.singular}`
	}

	return `${count} ${components.plural}`
}
