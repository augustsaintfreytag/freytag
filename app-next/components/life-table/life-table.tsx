import { FunctionComponent } from "react"
import { LifeTableItemData } from "~/components/life-table/models/life-table-item-data"
import LifeTableItem from "./components/life-table-item"
import styles from "./life-table.module.sass"

type Props = {
	data: LifeTableItemData[]
}

const LifeTable: FunctionComponent<Props> = props => (
	<section className={styles.table}>
		<header></header>
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

export default LifeTable
