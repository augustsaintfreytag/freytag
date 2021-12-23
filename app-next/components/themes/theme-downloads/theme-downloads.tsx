import { FunctionComponent } from "react"
import ArticleMarkdown from "~/components/markdown/article-markdown"
import ThemeDownloadItem, { Props as ItemProps } from "~/components/themes/theme-downloads/components/theme-download-item"
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
						<ul>
							{props.items.map(item => {
								const { format, href } = item

								return (
									<li key={`${format}-${href}`}>
										<ThemeDownloadItem name={props.name} format={format} href={href} />
									</li>
								)
							})}
						</ul>
					</div>
				</>
			) : (
				<div className={styles.introduction}>This theme is not currently available in any format.</div>
			)}
			<div className={styles.description}>
				<ArticleMarkdown>
					All colour themes are created from a *hand-picked colour palette* in the Intermediate theme format (`intertheme`). Formats of specific
					editors are created by converting intermediate themes to the respective format.
				</ArticleMarkdown>
			</div>
		</section>
	)
}

export default ThemeDownloads
