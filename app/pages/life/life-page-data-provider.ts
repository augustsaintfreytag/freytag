import * as CockpitDataProvider from "@/utils/cockpit/functions/cockpit-data-provider"
import { Dictionary } from "@/utils/common/library/dictionary"
import { Index } from "@/utils/common/library/index"
import { LifeEvent } from "@/utils/storage/models/life-event"
import * as SortingProvider from "@/utils/storage/providers/sorting-provider"

// Library
	
export type SortingMode = string
export type Filter = string

export type ToggleDefinition = { identifier: string, name: string, filter?: Filter }
export type HeaderDefinition = { identifier: string, name: string, sortable: boolean }
export type SortingProperties = {filter: Filter|undefined, sortingMode: SortingMode, sortingIsReversed: boolean}

// Configuration

export const toggleDefinitions: ToggleDefinition[] = [
	{identifier: "all", name: "All"},
	{identifier: "external", name: "External", filter: "External"},
	{identifier: "life", name: "Life", filter: "Life"},
	{identifier: "education", name: "Education", filter: "Education"},
	{identifier: "film", name: "Film", filter: "Film"},
	{identifier: "development", name: "Development", filter: "Development"},
	{identifier: "artwork", name: "Artwork", filter: "Artwork"},
	{identifier: "photography", name: "Photography", filter: "Photography"}
]

export const headerDefinitions: HeaderDefinition[] = [
	{identifier: "time", name: "Span", sortable: true},
	{identifier: "format", name: "Format", sortable: true},
	{identifier: "role", name: "Role", sortable: false},
	{identifier: "location", name: "Location", sortable: false},
	{identifier: "context", name: "Context", sortable: false}
]

export const sortingKeyPairs: Dictionary<SortingProvider.KeyPair> = {
	time: {primary: "dateStarted", secondary: "dateEnded"},
	format: {primary: "format", secondary: undefined}
}

export const sortingValueFallbacks: Dictionary<SortingProvider.AnyValueFallback> = {
	time: {primary: undefined, secondary: new Date()},
	format: {primary: undefined, secondary: undefined}
}

// Fetching

export async function fetchLifeEvents(): Promise<LifeEvent[]|undefined> {
	try {
		return await CockpitDataProvider.lifeEvents()
	} catch (error) {
		console.error(`Could not fetch life events. ${error}`)
		return undefined
	}
}

// Mapping

export function sortedLifeEvents(unsortedLifeEvents: LifeEvent[], properties: SortingProperties): {events: LifeEvent[], eventIndicesById: Dictionary<Index>} {
	const { filter, sortingMode, sortingIsReversed } = properties
	let events = [...unsortedLifeEvents]
	
	if (filter) {
		events = filteredLifeEventsWithOptions(events, {filter})
	}

	events = sortedLifeEventsWithMode(events, sortingMode, sortingIsReversed)
	const eventsById = mappedEventIndicesById(events)

	return { events, eventIndicesById: eventsById } 
}

function mappedEventIndicesById(events: LifeEvent[]): Dictionary<Index> {
	return events.reduce((map, event, index) => {
		map[event.meta.id] = index
		return map
	}, {})
}

// Sorting

export function isValidSortingMode(mode: SortingMode): boolean {
	return sortingKeyPairs[mode] !== undefined
}

function sortedLifeEventsWithMode(events: LifeEvent[], mode: SortingMode, reversed: boolean = false): LifeEvent[] {
	const sortingKeyPair = sortingKeyPairs[mode]!
	const sortingValueFallback = sortingValueFallbacks[mode]!

	return sortedLifeEventsWithOptions(events, {sortingKeyPair, sortingValueFallback, sortingReversed: reversed})
}

function filteredLifeEventsWithOptions(events: LifeEvent[], options: {filter: Filter}): LifeEvent[] {
	return events.filter(event => {
		return event.kind === options.filter
	})
}

function sortedLifeEventsWithOptions<SortedValue>(events: LifeEvent[], options: {sortingKeyPair: SortingProvider.KeyPair, sortingValueFallback: SortingProvider.ValueFallback<SortedValue>, sortingReversed: boolean}): LifeEvent[] {
	return SortingProvider.sortedModels(events, options)
}