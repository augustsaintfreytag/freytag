import { FunctionComponent, useState } from "react"
import { colorForLifeEventKind } from "~/components/life/life-event/functions/life-event-kind-colors"
import { LifeTableItemData } from "~/components/life/life-table/models/life-table-item-data"
import Typo from "~/components/typo/typo"
import { className } from "~/utils/class-names/class-name"
import { formattedOpenDateInterval } from "~/utils/date/functions/date-formatting"
import { propertiesWithStyleVariables } from "~/utils/style/functions/style-properties"
import styles from "./life-table-item.module.sass"

// Formatting

function formattedRole(role: string | undefined): string {
	if (!role) {
		return "—"
	}

	return role
}

function formattedContext(context: string | undefined): string {
	if (!context) {
		return "—"
	}

	if (context && context[context.length - 1] !== ".") {
		context += "."
	}

	return context
}

// Component

type Props = LifeTableItemData

const LifeTableItem: FunctionComponent<Props> = props => {
	const [isDisclosed, setIsDisclosed] = useState(false)
	const color = colorForLifeEventKind(props.kind)
	const style = propertiesWithStyleVariables({ accentColor: color })

	const onDisclosureClick = () => {
		setIsDisclosed(!isDisclosed)
	}

	return (
		<section className={className(styles.item, isDisclosed && styles.disclosed)} style={style}>
			<div className={styles.decorative}></div>
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
							<span className={styles.content}>
								<Typo>{formattedContext(props.context)}</Typo>
							</span>
						</div>
					</div>
					{props.description && (
						<div className={styles.description}>
							<div>
								<span className={styles.content}>
									<Typo>{props.description}</Typo>
								</span>
							</div>
						</div>
					)}
				</main>
			</div>
		</section>
	)
}

export default LifeTableItem
