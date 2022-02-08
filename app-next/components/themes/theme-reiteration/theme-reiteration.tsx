import { FunctionComponent } from "react"
import {
	allThemeEditorFormats,
	ThemeEditorFormat,
	themeFormatPurposeDescriptionForEditorFormat
} from "~/api/cockpit/records/themes/library/theme-editor-format"
import Reiteration from "~/components/reiteration/reiteration"

interface Props {
	name: string
	formats: Set<ThemeEditorFormat>
}

const ThemeReiteration: FunctionComponent<Props> = props => (
	<Reiteration>
		<p>
			Download "{props.name}" theme from <em>Theme Studio</em>.
		</p>
		{allThemeEditorFormats
			.filter(format => props.formats.has(format))
			.map(format => (
				<p key={format}>
					Download "{props.name}" theme for {themeFormatPurposeDescriptionForEditorFormat(format)}
				</p>
			))}
	</Reiteration>
)

export default ThemeReiteration
