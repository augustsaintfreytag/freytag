const titleText = "August Saint Freytag"
const descriptorUnified = "Concept and Experience Designer, Video and Story Artist"
const descriptorComponents = ["Concept Designer", "Video Artist", "Developer", "Editor", "Storyteller"]

export function headerText(): { title: string; descriptor: string } {
	const descriptorSeparator = "/"
	// const descriptorText = descriptorComponents.join(` ${descriptorSeparator} `)
	const descriptorText = descriptorUnified

	return { title: titleText, descriptor: descriptorText }
}
