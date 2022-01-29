import { FunctionComponent } from "react"
import MenuItem from "~/components/menu/components/menu-item"
import Menu from "~/components/menu/menu"

const itemProps = {
	returnToGallery: { symbol: "#Gallery Symbol", short: "Gallery", full: "Return to Gallery" },
	saveDraft: { symbol: "#Save Symbol", short: "Save", full: "Save Draft" },
	loadDraft: { symbol: "#Load Symbol", short: "Load", full: "Load Draft" },
	downloadTheme: { symbol: "#Cloud Symbol", short: "Download", full: "Download Preview" },
	submitDraft: { symbol: "#Submit Symbol", short: "Submit", full: "Submit Theme" }
}

interface Props {}

const ThemeEditorMenu: FunctionComponent<Props> = props => {
	return (
		<Menu>
			<MenuItem symbol={itemProps.returnToGallery.symbol} text={itemProps.returnToGallery} href="/themes#gallery" />
			<MenuItem symbol={itemProps.saveDraft.symbol} text={itemProps.saveDraft} href="#" disabled />
			<MenuItem symbol={itemProps.loadDraft.symbol} text={itemProps.loadDraft} href="#" disabled />
			<MenuItem symbol={itemProps.downloadTheme.symbol} text={itemProps.downloadTheme} href="#" disabled />
			<MenuItem symbol={itemProps.submitDraft.symbol} text={itemProps.submitDraft} href="#" disabled />
		</Menu>
	)
}

export default ThemeEditorMenu
