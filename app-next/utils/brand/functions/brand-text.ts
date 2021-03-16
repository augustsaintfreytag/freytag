export const brandTitleText = "August Saint Freytag"
export const brandDescriptorText = "Concept and Experience Designer, Video and Story Artist"
const brandDescriptorTextComponents = [
	"Concept Designer",
	"Video Artist",
	"Developer",
	"Editor",
	"Storyteller"
]

export function headerText(): { title: string; descriptor: string } {
	const descriptorSeparator = "/"
	// const descriptorText = descriptorComponents.join(` ${descriptorSeparator} `)

	return { title: brandTitleText, descriptor: brandDescriptorText }
}
