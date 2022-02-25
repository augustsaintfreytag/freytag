import { UUID } from "~/utils/uuid/uuid"

export interface ThemeGenerationProperties {
	id: UUID
	name: string
	description: string
	colors: string
}
