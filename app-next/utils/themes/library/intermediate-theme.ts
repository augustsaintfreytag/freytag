import { ColorValue } from "~/utils/colors/models/color"

export interface IntermediateTheme {
	_format: string
	_version: string

	foreground: ColorValue
	background: ColorValue
	selectionBackground: ColorValue
	activeLineBackground: ColorValue
	insertionPoint: ColorValue

	comment: ColorValue
	commentDocumentation: ColorValue
	commentSection: ColorValue
	commentSectionHeader: ColorValue

	keyword: ColorValue
	declarationAny: ColorValue
	declarationType: ColorValue
	functionProject: ColorValue
	functionSystem: ColorValue
	functionParameter: ColorValue
	preprocessorStatement: ColorValue
	preprocessorProject: ColorValue
	preprocessorSystem: ColorValue
	constantProject: ColorValue
	constantSystem: ColorValue
	variableProject: ColorValue
	variableSystem: ColorValue
	globalTypeProject: ColorValue
	globalTypeSystem: ColorValue
	referenceTypeProject: ColorValue
	referenceTypeSystem: ColorValue
	valueTypeProject: ColorValue
	valueTypeSystem: ColorValue
	attribute: ColorValue
	module: ColorValue

	number: ColorValue
	string: ColorValue
	character: ColorValue
	url: ColorValue
}

export function isIntermediateTheme(value: any): value is IntermediateTheme {
	return (
		typeof value === "object" &&
		typeof value._format === "string" &&
		typeof value._version === "string" &&
		value._format === "CTU Intermediate Theme Format"
	)
}
