import { FunctionComponent } from "react"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import styles from "./block-tag.module.sass"

enum Appearance {
	Decorative,
	Title
}

interface Props extends PropsWithClassName {
	appearance?: Appearance
	name: string
	representation?: string
}

function styleForAppearance(appearance: Appearance): string {
	switch (appearance) {
		case Appearance.Decorative:
			return styles.asDecorative
		case Appearance.Title:
			return styles.asTitle
	}
}

const BlockTag: FunctionComponent<Props> = props => {
	const style = className(styles.tag, styleForAppearance(props.appearance ?? Appearance.Decorative), props.className)

	return (
		<div className={style} data-tag-representation={props.representation}>
			{props.name}
		</div>
	)
}

export default BlockTag

export const BlockTagAppearance = Appearance
