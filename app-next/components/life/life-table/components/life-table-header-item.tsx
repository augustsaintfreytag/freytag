import { FunctionComponent } from "react"
import { LifeTableColumn as Column } from "~/components/life/life-table/library/life-table-column"
import { LifeTableSortMode as SortMode } from "~/components/life/life-table/library/life-table-sort-mode"
import { PropsWithClassName } from "~/types/props"
import { default as SortModeButton } from "./life-table-sort-mode-button"

type Props = PropsWithClassName & {
	text: string
	column: Column
	mode: SortMode
	onToggle: () => void
	disabled?: boolean
}

const LifeTableHeaderItem: FunctionComponent<Props> = props => (
	<SortModeButton className={props.className} text={props.text} mode={props.mode} onClick={props.onToggle} disabled={props.disabled} />
)

export default LifeTableHeaderItem
