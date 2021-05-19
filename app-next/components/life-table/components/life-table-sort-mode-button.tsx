import { FunctionComponent } from "react"
import { LifeTableSortMode as SortMode } from "~/components/life-table/library/life-table-sort-mode"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
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

function spriteReferenceForSortMode(sortMode: SortMode): SpriteReference {
	switch (sortMode) {
		case SortMode.None:
			return "#Arrow None"
		case SortMode.Descending:
			return "#Arrow Down"
		case SortMode.Ascending:
			return "#Arrow Up"
	}
}

// Indicator

type ModeIndicatorProps = PropsWithClassName & {
	mode: SortMode
}

const ModeIndicator: FunctionComponent<ModeIndicatorProps> = props => {
	const sortModeClassName = classNameForSortMode(props.mode)
	const spriteHref = spriteReferenceForSortMode(props.mode)

	return <Sprite className={className(styles.mode, sortModeClassName, props.className)} href={spriteHref} />
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
		<ModeIndicator className={styles.mode} mode={props.mode} />
	</button>
)

export default LifeTableSortModeButton
