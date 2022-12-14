import { FunctionComponent } from "react"
import InternalLink from "~/components/link/internal-link"
import Sprite, { SpriteReference } from "~/components/sprites/sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./menu-item.module.sass"

// Props

interface Props {
	disabled?: boolean
	symbol: SpriteReference
	text: {
		short: string
		full: string
	}
	href?: URL
	download?: boolean | string
	onClick?: () => void
}

// View Mode

enum ViewMode {
	Plain,
	Event,
	Link,
	Download
}

function viewModeForProps(props: Props): ViewMode | undefined {
	if (props.disabled) {
		return ViewMode.Plain
	}

	if (props.onClick) {
		return ViewMode.Event
	}

	if (props.download) {
		return ViewMode.Download
	}

	if (props.href) {
		return ViewMode.Link
	}

	return ViewMode.Plain
}

// Child Components

const Inlay: FunctionComponent<Props & PropsWithClassName> = props => (
	<div className={className(styles.inlay, props.className)} title={props.text.full}>
		<Sprite className={styles.symbol} href={props.symbol} />
		<div className={className(styles.text, styles.full)}>{props.text.full}</div>
		<div className={className(styles.text, styles.short)}>{props.text.short}</div>
	</div>
)

const EventWrappedInlay: FunctionComponent<Props> = props => (
	<a title={props.text.full} onClick={props.onClick}>
		<Inlay {...props} />
	</a>
)

const LinkWrappedInlay: FunctionComponent<Props> = props => (
	<InternalLink title={props.text.full} href={props.href ?? ""}>
		<Inlay {...props} />
	</InternalLink>
)

const DownloadWrappedInlay: FunctionComponent<Props> = props => (
	<a title={props.text.full} href={props.href} download={props.download}>
		<Inlay {...props} />
	</a>
)

// Component

const MenuItem: FunctionComponent<Props> = props => {
	const viewMode = viewModeForProps(props)

	return (
		<div className={className(styles.menuItem, props.disabled && styles.disabled)}>
			{viewMode === ViewMode.Plain && <Inlay className={styles.plain} {...props} />}
			{viewMode === ViewMode.Event && <EventWrappedInlay {...props} />}
			{viewMode === ViewMode.Download && <DownloadWrappedInlay {...props} />}
			{viewMode === ViewMode.Link && <LinkWrappedInlay {...props} />}
		</div>
	)
}

export default MenuItem
