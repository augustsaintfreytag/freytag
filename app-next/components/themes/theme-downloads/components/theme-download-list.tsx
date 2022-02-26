import { FunctionComponent } from "react"
import ThemeDownloadItem, { Props as ItemProps } from "~/components/themes/theme-downloads/components/theme-download-item"
import styles from "./theme-download-list.module.sass"

interface Props {
	name: string
	items: ItemProps[]
}

const ThemeDownloadList: FunctionComponent<Props> = props => (
	<ul className={styles.block}>
		{props.items.map(item => {
			const { format, href } = item

			return (
				<li key={`${format}-${href}`}>
					<ThemeDownloadItem name={props.name} format={format} href={href} />
				</li>
			)
		})}
	</ul>
)

export default ThemeDownloadList
