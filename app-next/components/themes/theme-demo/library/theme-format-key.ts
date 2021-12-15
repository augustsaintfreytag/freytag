import { Color, ColorValue } from "~/utils/colors/models/color"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"

export enum ThemeFormatKey {
	Foreground = "foreground",
	Background = "background",
	SelectionBackground = "selectionBackground",
	ActiveLineBackground = "activeLineBackground",
	InsertionPoint = "insertionPoint",

	Comment = "comment",
	CommentDocumentation = "commentDocumentation",
	CommentSection = "commentSection",
	CommentSectionHeader = "commentSectionHeader",

	Keyword = "keyword",
	DeclarationAny = "declarationAny",
	DeclarationType = "declarationType",
	FunctionProject = "functionProject",
	FunctionSystem = "functionSystem",
	FunctionParameter = "functionParameter",
	PreprocessorStatement = "preprocessorStatement",
	PreprocessorProject = "preprocessorProject",
	PreprocessorSystem = "preprocessorSystem",
	ConstantProject = "constantProject",
	ConstantSystem = "constantSystem",
	VariableProject = "variableProject",
	VariableSystem = "variableSystem",
	GlobalTypeProject = "globalTypeProject",
	GlobalTypeSystem = "globalTypeSystem",
	ReferenceTypeProject = "referenceTypeProject",
	ReferenceTypeSystem = "referenceTypeSystem",
	ValueTypeProject = "valueTypeProject",
	ValueTypeSystem = "valueTypeSystem",
	Attribute = "attribute",
	Module = "module",

	Number = "number",
	String = "string",
	Character = "character",
	Url = "url"
}

export function colorFromIntermediateTheme(theme: IntermediateTheme, key: ThemeFormatKey): Color {
	const colorValue = theme[key] as ColorValue
	return Color.fromValue(colorValue)
}
