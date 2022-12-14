import { CockpitDataAccess } from "cockpit-access"
import { CockpitCollection, defaultApiFilter } from "~/api/cockpit/data/library/data-access"
import { WorkShowcase } from "~/api/cockpit/records/work-showcase/library/work-showcase"
import { Dictionary } from "~/utils/types/library/dictionary"

// Work Showcase Collection

const workShowcaseCollectionFields: Dictionary<string, number> = {
	_id: 1,
	_created: 1,
	_modified: 1,
	display: 1,
	slug: 1,
	name: 1,
	description: 1,
	teaserImageTrailing: 1,
	teaserImageCentered: 1,
	event: 1
}

export async function workShowcasesFromApi(): Promise<WorkShowcase[]> {
	const response = await CockpitDataAccess.recordsInCollection(CockpitCollection.Work, {
		filter: defaultApiFilter,
		fields: workShowcaseCollectionFields
	})
	const entries = response.entries as WorkShowcase[]

	return entries
}

// Work Showcase

export async function workShowcaseFromApi(slug: string): Promise<WorkShowcase | undefined> {
	const filter = { ...defaultApiFilter, slug: slug }
	const response = await CockpitDataAccess.recordsInCollection(CockpitCollection.Work, { filter })
	const firstEntry = response.entries[0] as WorkShowcase | undefined

	return firstEntry
}
