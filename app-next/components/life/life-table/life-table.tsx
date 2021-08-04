import { useRouter } from "next/router"
import { FunctionComponent, useEffect, useState } from "react"
import LifeTableFilters from "~/components/life/life-table/components/life-table-filters"
import LifeTableHeader from "~/components/life/life-table/components/life-table-header"
import { LifeTableDataProps, useLifeTableData } from "~/components/life/life-table/functions/life-table-data-hook"
import { useLifeTableHeaderProps } from "~/components/life/life-table/functions/life-table-header-props-hook"
import * as LifeTableMapping from "~/components/life/life-table/functions/life-table-query-mapping"
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
	const initialProps = LifeTableMapping.lifeTablePropsFromQuery(router.query) ?? defaultProps

	const [activeFilterKind, setActiveFilterKind] = useState<FilterKind>(initialProps.filterKind)
	const { activeColumn, activeColumnSortMode, toggleColumn } = useLifeTableHeaderProps(initialProps.sortColumn, initialProps.sortMode)
	const { data, setDataProps } = useLifeTableData(props.data, initialProps)

	useEffect(() => {
		const dataProps = {
			filterKind: activeFilterKind,
			sortColumn: activeColumn,
			sortMode: activeColumnSortMode
		}

		setDataProps(dataProps)

		const routeAssignableProps = (() => {
			if (LifeTableMapping.lifeTablePropsAreEqual(dataProps, defaultProps)) {
				return undefined
			}

			return dataProps
		})()

		LifeTableMapping.setQueryFromLifeTableProps(router, routeAssignableProps)
	}, [activeFilterKind, activeColumn, activeColumnSortMode])

	const hash = window?.location.hash
	debugger

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
						{data.map(itemData => (
							<li key={itemData.id} id={itemData.id}>
								<LifeTableItem {...itemData} />
							</li>
						))}
					</ol>
				</main>
			</section>
		</>
	)
}

export default LifeTable
