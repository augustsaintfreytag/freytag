import WebAssemblyModule, { MemoryAddress } from "webassembly-module"
import { isModuleError } from "~/components/themes/theme-utility/library/module-error"
import { Color, isColorValue } from "~/utils/colors/models/color"

export async function echoMessageViaModule(module: WebAssemblyModule, message: string): Promise<string | undefined> {
	const messagePointer = await module.initializeStringValue(message)
	const results = await module.callStreamingFunctionWithArgument<string, MemoryAddress>("echoMessage", messagePointer)

	return results
}

export async function generateRandomColorViaModule(module: WebAssemblyModule): Promise<Color | undefined> {
	try {
		const encodedResults = await module.callStreamingFunction<string>("generateRandomColor")
		const results = JSON.parse(encodedResults ?? "")

		if (isModuleError(results)) {
			const error = results
			throw new Error(`Error '${error.kind}', ${error.description}.`)
		}

		if (!isColorValue(results)) {
			throw new TypeError(`Encoded color from module does not have a valid type.`)
		}

		return Color.fromValue(results)
	} catch (error) {
		console.error(`Could not generate random color via module. ${error}`)
		return undefined
	}
}
