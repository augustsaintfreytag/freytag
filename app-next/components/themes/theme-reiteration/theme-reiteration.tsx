import { FunctionComponent } from "react"
import { allThemeFormats, ThemeFormat, themeFormatPurposeDescriptionForFormat } from "~/api/cockpit/records/themes/library/theme-format"
import Reiteration from "~/components/reiteration/reiteration"

interface Props {
	name: string
	formats: Set<ThemeFormat>
}

const ThemeReiteration: FunctionComponent<Props> = props => (
	<Reiteration>
		<p>
			Download "{props.name}" theme from <em>Theme Studio</em>.
		</p>
		{allThemeFormats
			.filter(format => props.formats.has(format))
			.map(format => (
				<p key={format}>
					Download "{props.name}" theme for {themeFormatPurposeDescriptionForFormat(format)}
				</p>
			))}
	</Reiteration>
)

export default ThemeReiteration
