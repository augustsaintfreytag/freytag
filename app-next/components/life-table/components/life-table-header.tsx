import { FunctionComponent } from "react"
import { SortingMode } from "~/components/life-table/library/life-table-sorting-mode"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-header.module.sass"
import { default as SortModeButton } from "./life-table-sort-mode-button"

type ItemProps = {
	text: string
}

const Item: FunctionComponent<ItemProps> = props => (
	<div>
		<SortModeButton text={props.text} mode={SortingMode.Descending} />
	</div>
)

const LifeTableHeader: FunctionComponent = () => (
	<section className={className(styles.header, styles.table)}>
		<Item text="Span" />
		<Item text="Format" />
		<Item text="Role" />
		<Item text="Context" />
	</section>
)

export default LifeTableHeader
