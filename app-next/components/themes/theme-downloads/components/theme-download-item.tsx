import { FunctionComponent } from "react"
import {
	ThemeEditorFormat,
	themeFileDescriptionForEditorFormat,
	themeFormatPurposeDescriptionForEditorFormat,
	themeSymbolForEditorFormat
} from "~/api/records/themes/library/theme-editor-format"
import { track } from "~/components/analytics/functions/track"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-download-item.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	format: ThemeEditorFormat
	href: URL
}

const trackClick = (name: string, href: URL) => track(`Theme Download`, { name, href })

const ThemeDownloadItem: FunctionComponent<Props> = props => {
	const purpose = themeFormatPurposeDescriptionForEditorFormat(props.format)
	const title = `Download Theme "${props.name}" for ${purpose}`
	const symbol = themeSymbolForEditorFormat(props.format)

	const itemHeading = `Download for ${purpose}`
	const itemFormat = themeFileDescriptionForEditorFormat(props.format)

	return (
		<a href={props.href} title={title} onClick={() => trackClick(props.name, props.href)}>
			<button className={className(styles.item, props.className)}>
				<Sprite className={styles.symbol} href={symbol} />
				<div className={styles.text}>
					<div className={styles.heading}>{itemHeading}</div>
					<div className={styles.format}>{itemFormat}</div>
				</div>
			</button>
		</a>
	)
}

export default ThemeDownloadItem
