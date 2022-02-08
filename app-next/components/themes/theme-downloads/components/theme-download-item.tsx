import { FunctionComponent } from "react"
import {
	ThemeEditorFormat,
	themeFileDescriptionForEditorFormat,
	themeFormatPurposeDescriptionForEditorFormat,
	themeSymbolForEditorFormat
} from "~/api/cockpit/records/themes/library/theme-editor-format"
import { track } from "~/components/analytics/functions/track"
import Sprite from "~/components/sprites/sprite"
import { fileNameFromPath } from "~/components/themes/theme-downloads/functions/download-name-form"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-download-item.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	format: ThemeEditorFormat
	href: URL
}

const trackClick = (name: string, href: URL) => track("Theme Download", { name, href })

const ThemeDownloadItem: FunctionComponent<Props> = props => {
	const itemPurpose = themeFormatPurposeDescriptionForEditorFormat(props.format)
	const itemTitle = `Download Theme "${props.name}" for ${itemPurpose}`
	const itemHeading = `Download for ${itemPurpose}`
	const itemSymbol = themeSymbolForEditorFormat(props.format)
	const itemFormat = themeFileDescriptionForEditorFormat(props.format)
	const itemFileName = fileNameFromPath(props.name, props.href)

	return (
		<a href={props.href} title={itemTitle} onClick={() => trackClick(props.name, props.href)} download={itemFileName}>
			<button className={className(styles.item, props.className)}>
				<Sprite className={styles.symbol} href={itemSymbol} />
				<div className={styles.text}>
					<div className={styles.heading}>{itemHeading}</div>
					<div className={styles.format}>{itemFormat}</div>
				</div>
			</button>
		</a>
	)
}

export default ThemeDownloadItem
