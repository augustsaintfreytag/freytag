import { FunctionComponent, useState } from "react"
import { defaultSortModeForColumn, invertedSortMode } from "~/components/life-table/functions/life-table-sort-mode"
import { LifeTableColumn as Column } from "~/components/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-header.module.sass"
import { default as SortModeButton } from "./life-table-sort-mode-button"

// Item

type ItemDefinition = {
	column: Column
	text: string
}

type ItemProps = {
	text: string
	column: Column
	mode: SortMode
	onToggle: () => void
}

const Item: FunctionComponent<ItemProps> = props => (
	<div>
		<SortModeButton text={props.text} mode={props.mode} onClick={props.onToggle} />
	</div>
)

// Component

const items: ItemDefinition[] = [
	{ column: Column.Span, text: "Span" },
	{ column: Column.Format, text: "Format" },
	{ column: Column.Role, text: "Role" },
	{ column: Column.Context, text: "Context" }
]

type Props = {
	onSortModeChange?: (column: Column, mode: SortMode) => void
}

const LifeTableHeader: FunctionComponent<Props> = props => {
	const [activeColumn, setActiveColumn] = useState<Column>(Column.Span)
	const [activeColumnSortMode, setActiveColumnSortMode] = useState<SortMode>(defaultSortModeForColumn(activeColumn))

	function itemSortModeForColumn(column: Column): SortMode {
		if (column !== activeColumn) {
			return SortMode.None
		}

		return activeColumnSortMode
	}

	function toggleSortModeForColumn(column: Column) {
		const defer = () => {
			props.onSortModeChange?.(activeColumn, activeColumnSortMode)
		}

		if (column === activeColumn) {
			const newSortMode = invertedSortMode(activeColumnSortMode)
			setActiveColumnSortMode(newSortMode)
			defer()
			return
		}

		setActiveColumn(column)
		setActiveColumnSortMode(SortMode.Descending)
		defer()
	}

	return (
		<section className={className(styles.header, styles.table)}>
			{items.map((item, index) => (
				<Item
					key={index}
					text={item.text}
					column={item.column}
					mode={itemSortModeForColumn(item.column)}
					onToggle={() => {
						toggleSortModeForColumn(item.column)
					}}
				/>
			))}
		</section>
	)
}

export default LifeTableHeader
