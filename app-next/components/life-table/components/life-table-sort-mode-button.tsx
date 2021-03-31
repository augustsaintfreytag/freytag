import { FunctionComponent } from "react"
import { SortingMode } from "~/components/life-table/library/life-table-sorting-mode"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-sort-mode-button.module.sass"

// Utility

function classNameForSortingMode(sortingMode: SortingMode): string {
	switch (sortingMode) {
		case SortingMode.Ascending:
			return styles.modeAscending
		case SortingMode.Descending:
			return styles.modeDescending
		default:
			return styles.modeNone
	}
}

// Indicator

type ModeIndicatorProps = {
	mode: SortingMode
}

const ModeIndicator: FunctionComponent<ModeIndicatorProps> = props => {
	const sortingModeClassName = classNameForSortingMode(props.mode)
	return <Sprite className={className(styles.mode, sortingModeClassName)} href="#Arrow Bottom" />
}

// Component

type Props = PropsWithClassName & {
	text: string
	mode: SortingMode
	onClick?: () => void
}

const LifeTableSortModeButton: FunctionComponent<Props> = props => (
	<button className={className(styles.button, props.className)} onClick={props.onClick}>
		<div className={styles.label}>{props.text}</div>
		<ModeIndicator mode={props.mode} />
	</button>
)

export default LifeTableSortModeButton
