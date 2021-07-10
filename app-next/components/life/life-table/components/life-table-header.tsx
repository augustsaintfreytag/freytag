import { FunctionComponent } from "react"
import LifeTableHeaderItem from "~/components/life/life-table/components/life-table-header-item"
import { LifeTableColumn as Column } from "~/components/life/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life/life-table/library/life-table-sort-mode"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-header.module.sass"

// Definitions

interface ItemDefinition {
	column: Column
	text: string
	style: string
	isSortable: boolean
}

const items: ItemDefinition[] = [
	{ column: Column.Span, text: "Span", style: styles.interval, isSortable: true },
	{ column: Column.Format, text: "Format", style: styles.format, isSortable: true },
	{ column: Column.Role, text: "Role", style: styles.role, isSortable: true },
	{ column: Column.Context, text: "Context", style: styles.context, isSortable: false },
	{ column: Column.Description, text: "Description", style: styles.description, isSortable: false }
]

// Component

interface Props {
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

		return activeColumnSortMode || SortMode.None
	}

	return (
		<section className={className(styles.header, styles.table)}>
			{items.map((item, index) => (
				<LifeTableHeaderItem
					key={index}
					className={className(styles.item, item.style)}
					text={item.text}
					column={item.column}
					mode={itemSortModeForColumn(item.column)}
					onToggle={() => {
						if (!item.isSortable) {
							return
						}

						props.onColumnToggle?.(item.column)
					}}
					disabled={!item.isSortable}
				/>
			))}
		</section>
	)
}

export default LifeTableHeader
