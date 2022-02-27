import { FunctionComponent } from "react"
import ThemeDownloadItem, { Props as ItemProps } from "~/components/themes/theme-downloads/components/theme-download-item"
import styles from "./theme-download-list.module.sass"

interface Props {
	name: string
	items: ItemProps[]
}

const ThemeDownloadList: FunctionComponent<Props> = props => (
	<ul className={styles.block}>
		{props.items.map(item => (
			<li key={`${item.format}-${item.href}`}>
				<ThemeDownloadItem {...item} />
			</li>
		))}
	</ul>
)

export default ThemeDownloadList
