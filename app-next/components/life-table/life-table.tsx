import { FunctionComponent } from "react"
import LifeTableHeader from "~/components/life-table/components/life-table-header"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import LifeTableItem from "./components/life-table-item"
import styles from "./life-table.module.sass"

type Props = {
	data: LifeTableItemData[]
}

const LifeTable: FunctionComponent<Props> = props => {
	return (
		<section className={styles.table}>
			<header>
				<LifeTableHeader
					onSortModeChange={(column, sortMode) => {
						// TODO: Prepare displayable data on sort mode change (and initially).
					}}
				/>
			</header>
			<main>
				<ol>
					{props.data.map((itemData, index) => (
						<li key={index}>
							<LifeTableItem {...itemData} />
						</li>
					))}
				</ol>
			</main>
		</section>
	)
}

export default LifeTable
