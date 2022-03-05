import { FunctionComponent } from "react"
import { Props as ItemProps } from "~/components/themes/theme-downloads/components/theme-download-item"
import ThemeDownloadList from "~/components/themes/theme-downloads/components/theme-download-list"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./theme-downloads.module.sass"

// Component

interface Props extends PropsWithClassName {
	name: string
	items: ItemProps[]
}

const ThemeDownloads: FunctionComponent<Props> = props => {
	return (
		<section className={className(styles.block, props.className)}>
			<h2 className={styles.heading}>Download</h2>
			{props.items?.length ? (
				<>
					<div className={styles.introduction}>Get this theme in the following formats:</div>
					<div className={styles.list}>
						<ThemeDownloadList name={props.name} items={props.items} />
					</div>
				</>
			) : (
				<div className={styles.introduction}>This theme is not currently available in any format.</div>
			)}
			<div className={styles.description}>
				<WorkContentTextBlock>
					All colour themes are created from a *hand-picked colour palette* in the Intermediate theme format (`intertheme`). Formats of specific
					editors are created by converting intermediate themes to the respective format.
				</WorkContentTextBlock>
			</div>
		</section>
	)
}

export default ThemeDownloads
