import { FunctionComponent, useState } from "react"
import { LifeEventKind } from "~/api/records/life-event/library/life-event-kind"
import { LifeTableItemData } from "~/components/life/life-table/models/life-table-item-data"
import { className } from "~/utils/class-names/class-name"
import { formattedOpenDateInterval } from "~/utils/date/functions/date-formatting"
import styles from "./life-table-item.module.sass"

// Formatting

function formattedRole(role: string | undefined): string {
	return role ?? "Any"
}

function formattedContext(context: string | undefined): string {
	let text = context ?? ""
	if (text && text[text.length - 1] !== ".") {
		text += "."
	}

	return text
}

function kindAttributeValue(kind: LifeEventKind): string {
	return kind.toLowerCase()
}

// State Strings

function disclosureTextForState(isDisclosed: boolean): string {
	if (!isDisclosed) {
		return "Show more"
	} else {
		return "Hide details"
	}
}

// Component

type Props = LifeTableItemData

const LifeTableItem: FunctionComponent<Props> = props => {
	const [isDisclosed, setIsDisclosed] = useState(false)

	const onDisclosureClick = () => {
		setIsDisclosed(!isDisclosed)
	}

	return (
		<section className={className(styles.item, isDisclosed && styles.disclosed)}>
			<div className={styles.decorative} data-tag-representation={kindAttributeValue(props.kind)}></div>
			<div className={styles.inlay}>
				<header>
					<button onClick={onDisclosureClick}>{props.name}</button>
				</header>
				<main className={styles.table}>
					<div className={styles.interval}>{formattedOpenDateInterval(props.interval)}</div>
					<div className={styles.format}>{props.format}</div>
					<div className={styles.role}>
						<div>
							<span className={styles.leader}>Role: </span>
							<span className={styles.content}>{formattedRole(props.role)}</span>
						</div>
					</div>
					<div className={styles.context}>
						<div>
							<span className={styles.leader}>Context: </span>
							<span className={styles.content}>{formattedContext(props.context)}</span>
						</div>
					</div>
					{props.description && (
						<div className={styles.description}>
							<div>
								<span className={styles.content}>{props.description}</span>
							</div>
						</div>
					)}
				</main>
			</div>
		</section>
	)
}

export default LifeTableItem
