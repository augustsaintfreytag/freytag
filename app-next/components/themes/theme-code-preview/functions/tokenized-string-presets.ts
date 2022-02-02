import { ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"
import { SyntaxToken, SyntaxTokenValue, TokenizedString } from "../library/tokenized-string"

// Form

const [space, indent, newLine] = [() => SyntaxToken.space, () => SyntaxToken.indent, () => SyntaxToken.newLine]

function tokenizedString(values: SyntaxTokenValue[]): TokenizedString {
	const tokens = values.map(SyntaxToken.fromValue)
	return new TokenizedString(tokens)
}

// Presets

export function typeScriptTokenizedString(): TokenizedString {
	const tokens: SyntaxTokenValue[] = []

	tokens.push(
		{ word: "/**", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Model of metadata associated with stored objects.", kind: ThemeFormatKey.CommentDocumentation },
		{ word: "*/", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "class", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectMetadata", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "implements", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "Hashable", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "," },
		space(),
		{ word: "ObjectProperty", kind: ThemeFormatKey.ReferenceTypeProject },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		{ word: "id", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "UUID", kind: ThemeFormatKey.ReferenceTypeSystem },
		newLine(),
		indent(),
		{ word: "created", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Date", kind: ThemeFormatKey.ReferenceTypeSystem },
		newLine(),
		indent(),
		{ word: "owners", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Set", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "<" },
		{ word: "OwnerIdentifier", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ">" },
		newLine(),
		indent(),
		{ word: "data", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "string", kind: ThemeFormatKey.GlobalTypeSystem },
		newLine(),
		indent(),
		space(),
		newLine(),
		indent(),
		{ word: "constructor", kind: ThemeFormatKey.Keyword },
		{ word: "(" },
		{ word: "id", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "UUID", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "," },
		space(),
		{ word: "created", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "Date", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "," },
		space(),
		{ word: "owners", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "Set", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "<" },
		{ word: "OwnerIdentifier", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ">" },
		{ word: "," },
		space(),
		{ word: "data", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "string", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: ")" },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		indent(),
		{ word: "this", kind: ThemeFormatKey.VariableProject },
		{ word: "." },
		{ word: "id", kind: ThemeFormatKey.VariableProject },
		space(),
		{ word: "=" },
		space(),
		{ word: "id", kind: ThemeFormatKey.VariableProject },
		newLine(),
		indent(),
		indent(),
		{ word: "this", kind: ThemeFormatKey.VariableProject },
		{ word: "." },
		{ word: "created", kind: ThemeFormatKey.VariableProject },
		space(),
		{ word: "=" },
		space(),
		{ word: "created", kind: ThemeFormatKey.VariableProject },
		newLine(),
		indent(),
		indent(),
		{ word: "this", kind: ThemeFormatKey.VariableProject },
		{ word: "." },
		{ word: "owners", kind: ThemeFormatKey.VariableProject },
		space(),
		{ word: "=" },
		space(),
		{ word: "owners", kind: ThemeFormatKey.VariableProject },
		newLine(),
		indent(),
		indent(),
		{ word: "this", kind: ThemeFormatKey.VariableProject },
		{ word: "." },
		{ word: "data", kind: ThemeFormatKey.VariableProject },
		space(),
		{ word: "=" },
		space(),
		{ word: "data", kind: ThemeFormatKey.VariableProject },
		newLine(),
		indent(),
		{ word: "}" },
		newLine(),
		{ word: "}" },
		newLine()
	)

	tokens.push(space(), newLine())

	tokens.push(
		{ word: "type", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "GroupedObjects", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "=" },
		space(),
		{ word: "Dictionary", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "<" },
		{ word: "ObjectGroup", kind: ThemeFormatKey.ReferenceTypeProject },
		{ word: "," },
		space(),
		{ word: "Set", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "<" },
		{ word: "Object", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ">" },
		{ word: ">" },
		newLine(),
		space(),
		newLine(),
		{ word: "/**", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Functionality to create collections of objects grouped by intrinsic properties.", kind: ThemeFormatKey.CommentDocumentation },
		{ word: "*/", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "export", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "interface", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectProvider", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		{ word: "groupedObjects", kind: ThemeFormatKey.FunctionProject },
		{ word: "(" },
		{ word: "collection", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "Object", kind: ThemeFormatKey.ReferenceTypeProject },
		{ word: "[]" },
		{ word: ")" },
		{ word: ":" },
		space(),
		{ word: "GroupedObjects", kind: ThemeFormatKey.ValueTypeProject },
		newLine(),
		{ word: "}" },
		newLine()
	)

	tokens.push(space(), newLine())

	tokens.push(
		{ word: "/**", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Metadata describing a report of stored objects.", kind: ThemeFormatKey.CommentDocumentation },
		{ word: "*/", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "class", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectReport", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		{ word: "id", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "UUID", kind: ThemeFormatKey.ReferenceTypeSystem },
		space(),
		{ word: "=" },
		space(),
		{ word: "randomUUID", kind: ThemeFormatKey.FunctionSystem },
		{ word: "()" },
		newLine(),
		indent(),
		{ word: "name", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "string", kind: ThemeFormatKey.GlobalTypeSystem },
		space(),
		{ word: "=" },
		space(),
		{ word: '"Most Recent"', kind: ThemeFormatKey.String },
		newLine(),
		indent(),
		{ word: "kind", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "ReportKind", kind: ThemeFormatKey.ValueTypeProject },
		space(),
		{ word: "=" },
		space(),
		{ word: "ReportKind", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ".LastInterval", kind: ThemeFormatKey.ConstantProject },
		newLine(),
		indent(),
		{ word: "numberOfEntries", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Int", kind: ThemeFormatKey.ValueTypeSystem },
		space(),
		{ word: "=" },
		space(),
		{ word: "400", kind: ThemeFormatKey.Number },
		newLine(),
		{ word: "}" }
	)

	return tokenizedString(tokens)
}

export function swiftTokenizedString(): TokenizedString {
	const tokens: SyntaxTokenValue[] = []

	tokens.push(
		{ word: "///", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Model of metadata associated with stored objects.", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "struct", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectMetadata", kind: ThemeFormatKey.DeclarationType },
		{ word: ":" },
		space(),
		{ word: "Hashable", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "," },
		space(),
		{ word: "ObjectProperty", kind: ThemeFormatKey.ReferenceTypeProject },
		space(),
		{ word: "{" },
		space(),
		newLine(),
		indent(),
		{ word: "let", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "id", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "UUID", kind: ThemeFormatKey.ReferenceTypeSystem },
		newLine(),
		indent(),
		{ word: "let", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "created", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Date", kind: ThemeFormatKey.ReferenceTypeSystem },
		newLine(),
		indent(),
		{ word: "let", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "owners", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Set", kind: ThemeFormatKey.ReferenceTypeSystem },
		{ word: "<" },
		{ word: "Owner", kind: ThemeFormatKey.ValueTypeProject },
		{ word: "." },
		{ word: "Identifier", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ">" },
		newLine(),
		indent(),
		{ word: "let", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "data", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "String", kind: ThemeFormatKey.GlobalTypeSystem },
		newLine(),
		{ word: "}" },
		newLine()
	)

	tokens.push(space(), newLine())

	tokens.push(
		{ word: "typealias", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "GroupedObjects", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "=" },
		space(),
		{ word: "[" },
		{ word: "ObjectGroup", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ":" },
		space(),
		{ word: "Set", kind: ThemeFormatKey.ValueTypeSystem },
		{ word: "<" },
		{ word: "Object", kind: ThemeFormatKey.ValueTypeProject },
		{ word: ">" },
		{ word: "]" },
		newLine(),
		space(),
		newLine(),
		{ word: "///", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Functionality to create collections of objects grouped by intrinsic properties.", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "protocol", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectProvider", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		{ word: "func", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "groupedObjects", kind: ThemeFormatKey.DeclarationAny },
		{ word: "(" },
		{ word: "_", kind: ThemeFormatKey.DeclarationAny },
		space(),
		{ word: "collection", kind: ThemeFormatKey.FunctionParameter },
		{ word: ":" },
		space(),
		{ word: "[" },
		{ word: "Object", kind: ThemeFormatKey.ValueTypeProject },
		{ word: "]" },
		{ word: ")" },
		space(),
		{ word: "->" },
		space(),
		{ word: "GroupedObjects", kind: ThemeFormatKey.ValueTypeProject },
		newLine(),
		{ word: "}" },
		newLine()
	)

	tokens.push(space(), newLine())

	tokens.push(
		{ word: "///", kind: ThemeFormatKey.CommentDocumentation },
		space(),
		{ word: "Metadata describing a report of stored objects.", kind: ThemeFormatKey.CommentDocumentation },
		newLine(),
		{ word: "struct", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "ObjectReport", kind: ThemeFormatKey.DeclarationType },
		space(),
		{ word: "{" },
		newLine(),
		indent(),
		{ word: "var", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "id", kind: ThemeFormatKey.DeclarationAny },
		space(),
		{ word: "=" },
		space(),
		{ word: "UUID", kind: ThemeFormatKey.ValueTypeSystem },
		{ word: "()" },
		newLine(),
		indent(),
		{ word: "var", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "name", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "String", kind: ThemeFormatKey.GlobalTypeSystem },
		space(),
		{ word: "=" },
		space(),
		{ word: '"Most Recent"', kind: ThemeFormatKey.String },
		newLine(),
		indent(),
		{ word: "var", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "kind", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "ReportKind", kind: ThemeFormatKey.ValueTypeProject },
		space(),
		{ word: "=" },
		space(),
		{ word: ".lastInterval", kind: ThemeFormatKey.ConstantProject },
		newLine(),
		indent(),
		{ word: "var", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "numberOfEntries", kind: ThemeFormatKey.DeclarationAny },
		{ word: ":" },
		space(),
		{ word: "Int", kind: ThemeFormatKey.ValueTypeSystem },
		space(),
		{ word: "=" },
		space(),
		{ word: "400", kind: ThemeFormatKey.Number },
		newLine(),
		{ word: "}" },
		newLine()
	)

	return tokenizedString(tokens)
}

export function markdownTokenizedString(): TokenizedString {
	const tokens: SyntaxToken[] = [
		{ word: "#", kind: ThemeFormatKey.Keyword },
		space(),
		{ word: "Scene Description", kind: ThemeFormatKey.CommentSectionHeader },
		newLine(),
		space(),
		newLine(),
		{ word: "We open to the interior of a " },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: "newsroom", kind: ThemeFormatKey.GlobalTypeSystem },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: " in Paris." },
		space(),
		{ word: "It is " },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: "daytime", kind: ThemeFormatKey.GlobalTypeSystem },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: ", a typically busy day. On hold, with the " },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: "phone", kind: ThemeFormatKey.GlobalTypeSystem },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: " cradled under an ear, Will sorts through a " },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: "bundle of mail", kind: ThemeFormatKey.GlobalTypeSystem },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: " dropped on his desk." },
		newLine(),
		space(),
		newLine(),
		{ word: "Will speaks into the " },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{ word: "phone", kind: ThemeFormatKey.GlobalTypeSystem },
		{ word: "*", kind: ThemeFormatKey.Keyword },
		{
			word: `, without pauses, "William Bloom with the Associated Press, if I could just…" He's put back on hold. Returning to the mail, he finds a hand-addressed envelope. He rips it open.`
		}
	]

	return tokenizedString(tokens)
}
