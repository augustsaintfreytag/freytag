import { FunctionComponent } from "react"
import { useFileObjectURL } from "~/components/file-object/file-object-url-hook"
import MenuItem from "~/components/menu/components/menu-item"
import Menu from "~/components/menu/menu"
import { PropsWithClassName } from "~/types/props"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

const itemProps = {
	returnToGallery: { symbol: "#Gallery Symbol", short: "Gallery", full: "Return to Gallery" },
	resetDraft: { symbol: "#Reset Symbol", short: "Reset", full: "New Draft" },
	saveDraft: { symbol: "#Save Symbol", short: "Save", full: "Save Draft" },
	loadDraft: { symbol: "#Load Symbol", short: "Load", full: "Load Draft" },
	downloadTheme: { symbol: "#Cloud Symbol", short: "Download", full: "Download Preview" },
	submitDraft: { symbol: "#Submit Symbol", short: "Submit", full: "Submit Theme" }
}

interface Props extends PropsWithClassName {
	theme?: IntermediateTheme
}

const ThemeEditorMenu: FunctionComponent<Props> = props => {
	const themeFileName = "theme-editor-draft.intertheme"
	const themeFileURL = useFileObjectURL(themeFileName, "application/json", props.theme)

	return (
		<Menu className={props.className}>
			<MenuItem symbol={itemProps.returnToGallery.symbol} text={itemProps.returnToGallery} href="/themes#gallery" />
			<MenuItem symbol={itemProps.resetDraft.symbol} text={itemProps.resetDraft} disabled />
			<MenuItem symbol={itemProps.saveDraft.symbol} text={itemProps.saveDraft} disabled />
			<MenuItem symbol={itemProps.loadDraft.symbol} text={itemProps.loadDraft} disabled />
			<MenuItem
				symbol={itemProps.downloadTheme.symbol}
				text={itemProps.downloadTheme}
				href={themeFileURL}
				download={themeFileName}
				disabled={!themeFileURL}
			/>
			<MenuItem symbol={itemProps.submitDraft.symbol} text={itemProps.submitDraft} disabled />
		</Menu>
	)
}

export default ThemeEditorMenu
