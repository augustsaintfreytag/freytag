import { FunctionComponent } from "react"
import InternalLink from "~/components/link/internal-link"
import Sprite from "~/components/sprites/sprite"
import { ThemeMenuSprite } from "~/components/themes/theme-menu/library/theme-menu-sprite"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import styles from "./theme-menu-item.module.sass"

// Props

interface Props {
	disabled?: boolean
	symbol: ThemeMenuSprite
	text: string
	href?: URL
	onClick?: () => void
}

// View Mode

enum ViewMode {
	Plain,
	Event,
	Link
}

function viewModeForProps(props: Props): ViewMode | undefined {
	if (props.disabled) {
		return ViewMode.Plain
	}

	if (props.onClick) {
		return ViewMode.Event
	}

	if (props.href) {
		return ViewMode.Link
	}

	return ViewMode.Plain
}

// Child Components

const Inlay: FunctionComponent<Props & PropsWithClassName> = props => (
	<div className={className(styles.inlay, props.className)}>
		<Sprite className={styles.symbol} href={props.symbol} />
		<div className={styles.text}>{props.text}</div>
	</div>
)

const EventWrappedInlay: FunctionComponent<Props> = props => (
	<a onClick={props.onClick}>
		<Inlay {...props} />
	</a>
)

const LinkWrappedInlay: FunctionComponent<Props> = props => (
	<InternalLink href={props.href ?? ""}>
		<Inlay {...props} />
	</InternalLink>
)

// Component

const ThemeMenuItem: FunctionComponent<Props> = props => {
	const viewMode = viewModeForProps(props)

	return (
		<div className={className(styles.menuItem, props.disabled && styles.disabled)}>
			{viewMode === ViewMode.Plain && <Inlay className={styles.plain} {...props} />}
			{viewMode === ViewMode.Event && <EventWrappedInlay {...props} />}
			{viewMode === ViewMode.Link && <LinkWrappedInlay {...props} />}
		</div>
	)
}

export default ThemeMenuItem
