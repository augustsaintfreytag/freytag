import { Person, WithContext } from "schema-dts"
import { socialGitLabUrl, socialInstagramUrl, socialMediumUrl, socialTwitterUrl, socialVimeoUrl } from "~/components/meta/functions/social-media"
import { cockpitHost, cockpitProtocol } from "~/components/meta/library/app"

export const personSchema: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "August Saint Freytag",
	alternateName: "August Freytag",
	gender: "male",
	description: "Filmmaker & Media Creator",
	disambiguatingDescription: "Media Creator, Experience Designer, Concept Designer, Artist",
	url: "https://augustfreytag.com",
	image: `${cockpitProtocol()}://${cockpitHost()}/storage/uploads/2021/06/18/August-Saint-Freytag-Profile-01_uid_60cc6e18b98d1.jpg`,
	sameAs: [socialVimeoUrl(), socialTwitterUrl(), socialInstagramUrl(), socialGitLabUrl(), socialMediumUrl()]
}
