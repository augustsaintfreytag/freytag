import { FunctionComponent } from "react"
import { ColorValue } from "~/api/common/library/color-value"
import { allLifeEventKinds } from "~/api/records/life-event/library/life-event-kind"
import { colorForLifeEventKind } from "~/components/life/life-event/functions/life-event-kind-colors"
import {
	LifeTableFilterKind as FilterKind,
	LifeTableFilterKindAll as FilterKindAll
} from "~/components/life/life-table/library/life-table-filter-kind"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./life-table-filters.module.sass"

// Filter Definitions

export interface FilterDefinition {
	kind: FilterKind
	attribute: string
	text: string
	color?: ColorValue
}

const filterDefinitions = (() => {
	const definitions: FilterDefinition[] = []

	definitions.push({
		kind: FilterKindAll,
		attribute: "all",
		text: "All"
	})

	for (const kind of allLifeEventKinds) {
		definitions.push({
			kind: kind,
			attribute: kind.toLowerCase(),
			text: kind,
			color: colorForLifeEventKind(kind)
		})
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
					const style = propertiesWithStyleVariables({ accentColor: definition.color })

					return (
						<button
							key={definition.kind}
							className={className(styles.item, isActive && styles.active)}
							style={style}
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
