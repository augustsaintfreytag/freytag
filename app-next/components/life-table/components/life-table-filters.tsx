import { FunctionComponent } from "react"
import { LifeTableFilterKind as FilterKind, LifeTableFilterKindAll as FilterKindAll } from "~/components/life-table/library/life-table-filter-kind"
import { PropsWithClassName } from "~/types/props"
import { allLifeEventKinds } from "~/utils/api/records/life-event/life-event-kind"
import { className } from "~/utils/class-names/class-name"
import styles from "./life-table-filters.module.sass"

// Filter Definitions

export type FilterDefinition = {
	kind: FilterKind
	attribute: string
	text: string
}

const filterDefinitions = (() => {
	const definitions: FilterDefinition[] = []

	definitions.push({
		kind: FilterKindAll,
		attribute: "all",
		text: "All"
	})

	for (const kind of allLifeEventKinds) {
		definitions.push({ kind: kind, attribute: kind.toLowerCase(), text: kind })
	}

	return definitions
})()

// Component

type Props = PropsWithClassName & {
	activeFilterKind: FilterKind
	onFilterChange?: (kind: FilterKind) => void
}

const LifeTableFilters: FunctionComponent<Props> = props => {
	return (
		<section className={className(props.className, styles.filters)}>
			<div className={styles.inlay}>
				{filterDefinitions.map(definition => {
					const isActive = props.activeFilterKind === definition.kind

					return (
						<button
							key={definition.kind}
							className={className(styles.item, isActive && styles.active)}
							onClick={() => {
								props.onFilterChange?.(definition.kind)
							}}
						>
							<div className={styles.decorative} data-tag-representation={definition.attribute} />
							<span className={styles.label}>{definition.text}</span>
						</button>
					)
				})}
			</div>
		</section>
	)
}

export default LifeTableFilters
