import { FunctionComponent } from "react"
import {
	themeFileDescriptionForFormat,
	ThemeFormat,
	themeFormatPurposeDescriptionForFormat,
	themeResourceName,
	themeSymbolForFormat
} from "~/api/cockpit/records/themes/library/theme-format"
import { track } from "~/components/analytics/functions/track"
import Sprite from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-download-item.module.sass"

export interface Props extends PropsWithClassName {
	name: string
	format: ThemeFormat
	href?: URL
	onClick?: () => void
}

const trackClick = (name: string, href: URL) => track("Theme Download", { name, href })

const ThemeDownloadItem: FunctionComponent<Props> = props => {
	const itemPurpose = themeFormatPurposeDescriptionForFormat(props.format)
	const itemTitle = `Download Theme "${props.name}" for ${itemPurpose}`
	const itemHeading = `Download for ${itemPurpose}`
	const itemSymbol = themeSymbolForFormat(props.format)
	const itemFormat = themeFileDescriptionForFormat(props.format)
	const itemFileName = themeResourceName(props.name, props.format)

	const onClick = () => {
		if (props.href) {
			trackClick(props.name, props.href)
		}

		props.onClick?.()
	}

	return (
		<a href={props.href} title={itemTitle} onClick={onClick} download={itemFileName}>
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
