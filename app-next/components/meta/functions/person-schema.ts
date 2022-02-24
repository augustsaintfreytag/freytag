import { Person, WithContext } from "schema-dts"
import { cockpitHostClient, cockpitProtocol } from "~/components/app/app"
import { socialGitLabUrl, socialInstagramUrl, socialMediumUrl, socialTwitterUrl, socialVimeoUrl } from "~/components/meta/functions/social-media"
import { URL } from "~/utils/routing/library/url"

function globalImageUrl(path: string): URL {
	return `${cockpitProtocol()}://${cockpitHostClient()}${path}`
}

const profileImages = [
	globalImageUrl("/storage/uploads/2021/06/18/August-Saint-Freytag-Profile-01_uid_60cc6e18b98d1.jpg"),
	globalImageUrl("/storage/uploads/2021/06/18/August-Saint-Freytag-and-Steve-Luxembourg-on-The-Farewell-01_uid_60ccf3e095129.jpg"),
	globalImageUrl("/storage/uploads/2021/06/18/August-Saint-Freytag-Never-Come-Again-Profile-01_uid_60ccf4c11582f.jpg")
]

export function personSchema(): WithContext<Person> {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "August Saint Freytag",
		alternateName: "August Freytag",
		gender: "male",
		nationality: "German",
		description: "Designer & Media Creator",
		disambiguatingDescription: "Mixed Media Creator, Experience Designer, Concept Designer, Filmmaker, Artist",
		url: "https://augustfreytag.com",
		image: profileImages,
		sameAs: [socialVimeoUrl(), socialTwitterUrl(), socialInstagramUrl(), socialGitLabUrl(), socialMediumUrl()]
	}
}
