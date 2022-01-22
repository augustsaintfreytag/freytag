export interface ModuleError {
	kind: string
	description: string
}

export function isModuleError(value: any): value is ModuleError {
	return value && typeof value === "object" && value.kind && value.description
}
