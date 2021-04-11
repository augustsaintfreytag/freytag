import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { allLifeEventKinds, LifeEventKind } from "~/utils/api/life-event/library/life-event-kind"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-filters.module.sass"

// Filter Definitions

const LifeEventKindAll = "All"

type FilterKind = LifeEventKind | typeof LifeEventKindAll

type FilterDefinition = {
	kind: FilterKind
	attribute: string
	text: string
}

const filterDefinitions = (() => {
	const definitions: FilterDefinition[] = []

	definitions.push({
		kind: LifeEventKindAll,
		attribute: "all",
		text: "All"
	})

	for (const kind of allLifeEventKinds) {
		definitions.push({ kind: kind, attribute: kind.toLowerCase(), text: kind })
	}

	return definitions
})()

// Component

type Props = PropsWithClassName & {}

const LifeTableFilters: FunctionComponent<Props> = props => {
	return (
		<section className={className(props.className, styles.filters)}>
			<div className={styles.inlay}>
				{filterDefinitions.map(definition => (
					<div className={styles.item}>
						<div className={styles.decorative} data-tag-representation={definition.attribute} />
						<span className={styles.label}>{definition.text}</span>
					</div>
				))}
			</div>
		</section>
	)
}

export default LifeTableFilters
