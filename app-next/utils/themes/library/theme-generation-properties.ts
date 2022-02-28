import { Color } from "~/utils/colors/models/color"
import { UUID } from "~/utils/uuid/uuid"

export interface ThemeGenerationProperties {
	id: UUID
	name: string
	description: string
	colors: Color[]
}
