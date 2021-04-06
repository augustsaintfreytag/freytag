import { FunctionComponent, useEffect } from "react"
import LifeTableHeader from "~/components/life-table/components/life-table-header"
import { useLifeTableData } from "~/components/life-table/functions/life-table-data-hook"
import { useLifeTableHeaderProps } from "~/components/life-table/functions/life-table-header-props-hook"
import { LifeTableColumn } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode } from "~/components/life-table/library/life-table-sort-mode"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import LifeTableItem from "./components/life-table-item"
import styles from "./life-table.module.sass"

type Props = {
	data: LifeTableItemData[]
}

const initialSortProps = { column: LifeTableColumn.Span, mode: LifeTableSortMode.Descending }

const LifeTable: FunctionComponent<Props> = props => {
	const { activeColumn, activeColumnSortMode, toggleColumn } = useLifeTableHeaderProps(initialSortProps.column)
	const { data, sortProps, setSortProps } = useLifeTableData(props.data, initialSortProps)

	useEffect(() => {
		setSortProps({
			column: activeColumn,
			mode: activeColumnSortMode
		})
	}, [activeColumn, activeColumnSortMode])

	return (
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
	)
}

export default LifeTable
