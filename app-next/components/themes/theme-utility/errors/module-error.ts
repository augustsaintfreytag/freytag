export class ModuleError extends Error {
	kind?: ModuleErrorKind

	constructor(kind: ModuleErrorKind, message: string) {
		super(message)

		this.name = this.constructor.name
		this.kind = kind
	}

	static fromData(data: ModuleErrorData): ModuleError {
		return new ModuleError(data.kind, data.errorDescription)
	}
}

export interface ModuleErrorData {
	kind: ModuleErrorKind
	errorDescription: string
}

// Library

export enum ModuleErrorKind {
	InvalidCoding = "invalidCoding",
	MissingArguments = "missingArguments",
	InvalidArguments = "invalidArguments",
	MissingImplementation = "missingImplementation",
	MissingResults = "missingResults",
	Deferred = "deferred"
}

// Type Guards

export function isEncodedModuleErrorData(value: any): boolean {
	return typeof value === "string" && value.startsWith("{") && value.includes("errorDescription")
}

export function isModuleErrorData(value: any): value is ModuleErrorData {
	return value && typeof value === "object" && value.kind && value.description
}
