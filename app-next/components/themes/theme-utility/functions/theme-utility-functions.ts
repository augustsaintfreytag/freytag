import WebAssemblyModule, { MemoryAddress } from "webassembly-module"
import { errorFromResults } from "~/components/themes/theme-utility/functions/theme-utility-error-decoding"
import { Color, isColorValue } from "~/utils/colors/models/color"
import { IntermediateTheme, isIntermediateTheme } from "~/utils/themes/library/intermediate-theme"

export async function echoMessageViaModule(module: WebAssemblyModule, message: string): Promise<string | undefined> {
	const messagePointer = await module.initializeStringValue(message)
	const results = await module.callStreamingFunctionWithArgument<string, MemoryAddress>("echoMessage", messagePointer)

	return results
}

export async function generateRandomColorViaModule(module: WebAssemblyModule): Promise<Color | undefined> {
	try {
		const encodedResults = await module.callStreamingFunction<string>("generateRandomColor")
		const results = JSON.parse(encodedResults ?? "")
		const error = errorFromResults(results)

		if (error) {
			throw error
		}

		if (!isColorValue(results)) {
			throw new TypeError(`Encoded color value from module does not have a valid type.`)
		}

		return Color.fromValue(results)
	} catch (error) {
		console.error(`Could not generate random color via module. ${error}`)
		return undefined
	}
}

export async function describeColorViaModule(module: WebAssemblyModule, colorDescription: string): Promise<string | undefined> {
	try {
		const inputPointer = await module.initializeStringValue(colorDescription)
		const encodedResults = await module.callStreamingFunctionWithArgument<string, MemoryAddress>("describeColor", inputPointer)
		const results = JSON.parse(encodedResults ?? "")
		const error = errorFromResults(results)

		if (error) {
			throw error
		}

		return results
	} catch (error) {
		console.error(`Could not describe color description '${colorDescription}' via module. ${error}`)
		return undefined
	}
}

export async function generateThemeViaModule(module: WebAssemblyModule, colors: Color[]): Promise<IntermediateTheme | undefined> {
	try {
		const encodedColors = JSON.stringify(colors.map(color => color.hex))
		const inputPointer = await module.initializeStringValue(encodedColors)
		const encodedResults = await module.callStreamingFunctionWithArgument<IntermediateTheme, MemoryAddress>("generateTheme", inputPointer)
		const error = errorFromResults(encodedResults)

		if (error) {
			throw error
		}

		const results = JSON.parse(encodedResults ?? "")

		if (!isIntermediateTheme(results)) {
			throw new TypeError(`Encoded intermediate theme does not have the correct format.`)
		}

		return results
	} catch (error) {
		console.error(`Could not generate theme via module. ${error}`)
		return undefined
	}
}
