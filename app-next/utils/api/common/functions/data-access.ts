import { CockpitAssetPathForm, CockpitDataAccess } from "cockpit-access"
import { imageRequest, ImageRequestFormat } from "~/utils/api/common/library/image-request-preset"
import { LifeEvent } from "~/utils/api/records/life-event/life-event"
import { WorkShowcase } from "~/utils/api/records/work-showcase/work-showcase"
import { URL } from "~/utils/routing/library/url"
import { Dictionary } from "~/utils/types/library/dictionary"

enum ApiCollection {
	Vita = "vita",
	Work = "work"
}

enum ApiSingleton {
	LandingGraphic = "landing_graphic",
	LandingWorks = "landing_works"
}

const defaultFilter = { display: true }

// Images

export function imageUrl(component?: string): URL {
	if (!component) {
		return "/assets/image-fallback.png"
	}

	return CockpitAssetPathForm.cockpitImage(component, imageRequest(ImageRequestFormat.Large))
}

// Data

const workShowcaseCollectionFields: Dictionary<string, number> = {
	_id: 1,
	_created: 1,
	_modified: 1,
	display: 1,
	slug: 1,
	name: 1,
	description: 1,
	teaserImage: 1
}

export async function lifeEvents(): Promise<LifeEvent[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Vita, { filter: defaultFilter })
	const entries = response.entries as LifeEvent[]

	return entries
}

export async function workShowcases(): Promise<WorkShowcase[]> {
	const response = await CockpitDataAccess.recordsInCollection(ApiCollection.Work, { filter: defaultFilter, fields: workShowcaseCollectionFields })
	const entries = response.entries as WorkShowcase[]

	return entries
}

export function sortedWorkShowcases(showcases: WorkShowcase[]): WorkShowcase[] {
	return [...showcases].sort((lhs, rhs) => {
		if (lhs._created === rhs._created) {
			return 0
		}

		return lhs._created < rhs._created ? 1 : -1
	})
}
