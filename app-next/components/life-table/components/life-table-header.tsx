import { FunctionComponent } from "react"
import LifeTableHeaderItem from "~/components/life-table/components/life-table-header-item"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-header.module.sass"

// Item

type ItemDefinition = {
	column: Column
	text: string
}

// Component

const items: ItemDefinition[] = [
	{ column: Column.Span, text: "Span" },
	{ column: Column.Format, text: "Format" },
	{ column: Column.Role, text: "Role" },
	{ column: Column.Context, text: "Context" }
]

type Props = {
	activeColumn?: Column
	activeColumnSortMode?: SortMode
	onColumnToggle?: (column: Column) => void
}

const LifeTableHeader: FunctionComponent<Props> = props => {
	const { activeColumn, activeColumnSortMode } = props

	function itemSortModeForColumn(column?: Column): SortMode {
		if (column !== activeColumn) {
			return SortMode.None
		}

		return activeColumnSortMode ?? SortMode.None
	}

	return (
		<section className={className(styles.header, styles.table)}>
			{items.map((item, index) => (
				<LifeTableHeaderItem
					className={styles.item}
					key={index}
					text={item.text}
					column={item.column}
					mode={itemSortModeForColumn(item.column)}
					onToggle={() => {
						props.onColumnToggle?.(item.column)
					}}
				/>
			))}
		</section>
	)
}

export default LifeTableHeader
