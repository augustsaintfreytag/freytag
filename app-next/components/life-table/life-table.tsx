import { FunctionComponent, useEffect, useState } from "react"
import LifeTableFilters from "~/components/life-table/components/life-table-filters"
import LifeTableHeader from "~/components/life-table/components/life-table-header"
import { DataProps, useLifeTableData } from "~/components/life-table/functions/life-table-data-hook"
import { useLifeTableHeaderProps } from "~/components/life-table/functions/life-table-header-props-hook"
import { LifeTableColumn } from "~/components/life-table/library/life-table-column"
import { LifeTableFilterKind as FilterKind, LifeTableFilterKindAll as FilterKindAll } from "~/components/life-table/library/life-table-filter-kind"
import { LifeTableSortMode } from "~/components/life-table/library/life-table-sort-mode"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import LifeTableItem from "./components/life-table-item"
import styles from "./life-table.module.sass"

type Props = {
	data: LifeTableItemData[]
}

const initialSortProps: DataProps = { filterKind: FilterKindAll, sortColumn: LifeTableColumn.Span, sortMode: LifeTableSortMode.Descending }

const LifeTable: FunctionComponent<Props> = props => {
	const [activeFilterKind, setActiveFilterKind] = useState<FilterKind>(initialSortProps.filterKind)
	const { activeColumn, activeColumnSortMode, toggleColumn } = useLifeTableHeaderProps(initialSortProps.sortColumn, initialSortProps.sortMode)
	const { data, setDataProps } = useLifeTableData(props.data, initialSortProps)

	useEffect(() => {
		setDataProps({
			filterKind: activeFilterKind,
			sortColumn: activeColumn,
			sortMode: activeColumnSortMode
		})
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
						{data.map((itemData, index) => (
							<li key={index}>
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
