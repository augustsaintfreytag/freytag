import { isEncodedModuleErrorData, isModuleErrorData, ModuleError } from "~/components/themes/theme-utility/errors/module-error"

export function errorFromResults(results: string | undefined): ModuleError | undefined {
	if (!isEncodedModuleErrorData(results)) {
		return undefined
	}

	const moduleErrorData = JSON.parse(results ?? "")

	if (!isModuleErrorData(moduleErrorData)) {
		return undefined
	}

	return ModuleError.fromData(moduleErrorData)
}
