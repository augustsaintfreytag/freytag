import { FunctionComponent } from "react"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-sort-mode-button.module.sass"

// Utility

function classNameForSortMode(sortMode: SortMode): string {
	switch (sortMode) {
		case SortMode.Ascending:
			return styles.modeAscending
		case SortMode.Descending:
			return styles.modeDescending
		default:
			return styles.modeNone
	}
}

// Indicator

type ModeIndicatorProps = {
	mode: SortMode
}

const ModeIndicator: FunctionComponent<ModeIndicatorProps> = props => {
	return <Sprite className={className(styles.mode, sortingModeClassName)} href="#Arrow Bottom" />
	const SortModeClassName = classNameForSortMode(props.mode)
}

// Component

type Props = PropsWithClassName & {
	text: string
	mode: SortMode
	onClick?: () => void
}

const LifeTableSortModeButton: FunctionComponent<Props> = props => (
	<button className={className(styles.button, props.className)} onClick={props.onClick}>
		<div className={styles.label}>{props.text}</div>
		<ModeIndicator mode={props.mode} />
	</button>
)

export default LifeTableSortModeButton
