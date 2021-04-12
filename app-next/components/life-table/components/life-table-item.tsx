import { FunctionComponent } from "react"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import { LifeEventKind } from "~/utils/api/records/life-event/library/life-event-kind"
import { formattedOpenDateInterval } from "~/utils/date/functions/date-formatting"
import styles from "./life-table-item.module.sass"

// Formatting

function formattedRole(role: string | undefined): string {
	return role ?? "Any"
}

function formattedContext(context: string | undefined): string {
	return context ?? ""
}

function kindAttributeValue(kind: LifeEventKind): string {
	return kind.toLowerCase()
}

// Component

type Props = LifeTableItemData

const LifeTableItem: FunctionComponent<Props> = props => (
	<section className={styles.item}>
		<div className={styles.decorative} data-tag-representation={kindAttributeValue(props.kind)}></div>
		<div className={styles.inlay}>
			<header>{props.name}</header>
			<main className={styles.table}>
				<div className={styles.interval}>{formattedOpenDateInterval(props.interval)}</div>
				<div className={styles.format}>{props.format}</div>
				<div className={styles.role}>{formattedRole(props.role)}</div>
				<div className={styles.context}>{formattedContext(props.context)}</div>
			</main>
		</div>
	</section>
)

export default LifeTableItem
