import { NextRouter as Router } from "next/router"
import { lifeEventKindFromRawValue } from "~/api/cockpit/records/life-event/library/life-event-kind"
import { LifeTableDataProps } from "~/components/life/life-table/functions/life-table-data-hook"
import { lifeTableColumnFromRawValue } from "~/components/life/life-table/library/life-table-column"
import { lifeTableSortModeFromRawValue } from "~/components/life/life-table/library/life-table-sort-mode"
import { QueryParameters } from "~/types/page"
import { valueFromRawValue } from "~/utils/routing/functions/query-parameter-value"
import { Dictionary } from "~/utils/types/library/dictionary"

// Library

enum ParameterKey {
	FilterKind = "filterBy",
	SortColumn = "sortBy",
	SortMode = "mode"
}

type Props = LifeTableDataProps

// Query to Props

export function lifeTablePropsFromQuery(query: QueryParameters): Props | undefined {
	const filterBy = valueFromRawValue(query, ParameterKey.FilterKind, lifeEventKindFromRawValue)
	const sortBy = valueFromRawValue(query, ParameterKey.SortColumn, lifeTableColumnFromRawValue)
	const mode = valueFromRawValue(query, ParameterKey.SortMode, lifeTableSortModeFromRawValue)

	if (!filterBy || !sortBy || !mode) {
		return undefined
	}

	return {
		filterKind: filterBy,
		sortColumn: sortBy,
		sortMode: mode
	}
}

// Props to Query

const routerTransitionOptions = { scroll: false }

function queryParametersFromProps(props: Props | undefined): Dictionary<string, string> {
	const query: Dictionary<string, string> = {}

	if (!props) {
		return query
	}

	query[ParameterKey.FilterKind] = props.filterKind
	query[ParameterKey.SortColumn] = props.sortColumn
	query[ParameterKey.SortMode] = props.sortMode

	return query
}

export function setQueryFromLifeTableProps(router: Router, props: Props | undefined, hash?: string) {
	const parameters = queryParametersFromProps(props)
	const currentRoute = router.pathname
	const route: Dictionary<string, any> = { pathname: currentRoute, query: parameters }

	if (hash) {
		route.hash = hash
	}

	router.replace(route, undefined, routerTransitionOptions)
}

// Prop Comparison

export function lifeTablePropsAreEqual(lhs: Props, rhs: Props): boolean {
	return lhs.filterKind === rhs.filterKind && lhs.sortColumn === rhs.sortColumn && lhs.sortMode === rhs.sortMode
}
