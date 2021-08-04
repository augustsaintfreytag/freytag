import { useRouter } from "next/router"
import { FunctionComponent, useEffect, useState } from "react"
import { locationHash } from "~/components/content-anchor/functions/location-hash"
import LifeTableFilters from "~/components/life/life-table/components/life-table-filters"
import LifeTableHeader from "~/components/life/life-table/components/life-table-header"
import { LifeTableDataProps, useLifeTableData } from "~/components/life/life-table/functions/life-table-data-hook"
import { useLifeTableHeaderProps } from "~/components/life/life-table/functions/life-table-header-props-hook"
import {
	lifeTablePropsAreEqual,
	lifeTablePropsFromQuery,
	setQueryFromLifeTableProps
} from "~/components/life/life-table/functions/life-table-query-mapping"
import { LifeTableColumn } from "~/components/life/life-table/library/life-table-column"
import {
	LifeTableFilterKind as FilterKind,
	LifeTableFilterKindAll as FilterKindAll
} from "~/components/life/life-table/library/life-table-filter-kind"
import { LifeTableSortMode } from "~/components/life/life-table/library/life-table-sort-mode"
import { LifeTableItemData } from "~/components/life/life-table/models/life-table-item-data"
import LifeTableItem from "./components/life-table-item"
import styles from "./life-table.module.sass"

const defaultProps: LifeTableDataProps = {
	filterKind: FilterKindAll,
	sortColumn: LifeTableColumn.Span,
	sortMode: LifeTableSortMode.Descending
}

interface Props {
	data: LifeTableItemData[]
}

const LifeTable: FunctionComponent<Props> = props => {
	const router = useRouter()
	const initialProps = lifeTablePropsFromQuery(router.query) ?? defaultProps

	const [activeFilterKind, setActiveFilterKind] = useState<FilterKind>(initialProps.filterKind)
	const { activeColumn, activeColumnSortMode, toggleColumn } = useLifeTableHeaderProps(initialProps.sortColumn, initialProps.sortMode)
	const { data, setDataProps } = useLifeTableData(props.data, initialProps)
	const highlightId = locationHash()

	useEffect(() => {
		const dataProps = {
			filterKind: activeFilterKind,
			sortColumn: activeColumn,
			sortMode: activeColumnSortMode
		}

		setDataProps(dataProps)

		const routeAssignableProps = (() => {
			if (lifeTablePropsAreEqual(dataProps, defaultProps)) {
				return undefined
			}

			return dataProps
		})()

		setQueryFromLifeTableProps(router, routeAssignableProps)
	}, [activeFilterKind, activeColumn, activeColumnSortMode])

	return (
		<>
			<LifeTableFilters
				className={styles.filters}
				activeFilterKind={activeFilterKind}
				onFilterChange={filterKind => {
					setActiveFilterKind(filterKind)
				}}
			/>
			<section className={styles.table}>
				<header>
					<LifeTableHeader
						activeColumn={activeColumn}
						activeColumnSortMode={activeColumnSortMode}
						onColumnToggle={column => {
							toggleColumn(column)
						}}
					/>
				</header>
				<main>
					<ol>
						{data.map(itemData => {
							const isHighlighted = highlightId === itemData.id
							const props = { ...itemData, highlighted: isHighlighted }

							return (
								<li key={props.id} id={props.id}>
									<LifeTableItem {...props} />
								</li>
							)
						})}
					</ol>
				</main>
			</section>
		</>
	)
}

export default LifeTable
