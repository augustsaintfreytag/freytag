import { ThemeFormatKey } from "~/components/themes/theme-code-preview/library/theme-format-key"
import { SyntaxToken, TokenizedString } from "../library/tokenized-string"

// Whitespace

function space(): SyntaxToken {
	return {
		word: " "
	}
}

function indent(): SyntaxToken {
	return {
		word: "    "
	}
}

function newLine(): SyntaxToken {
	return {
		word: "\n"
	}
}

// Presets

export function swiftTokenizedString(): TokenizedString {
	const tokens: SyntaxToken[] = []

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
		{ word: "400", kind: ThemeFormatKey.String },
		newLine(),
		{ word: "}" },
		newLine()
	)

	return new TokenizedString(tokens)
}

/*
struct Owner {
	typealias Identifier = UUID
}

protocol ObjectProperty {}

struct ObjectMetadata: Hashable, ObjectProperty {
	let id: UUID
	let created: Date
	let owners: Set<Owner.Identifier>
	let data: String
}

typealias Object = AnyHashable
typealias ObjectGroup = String

protocol ObjectProvider {
	func groupedObjects(_ collection: [Object]) -> [ObjectGroup: Set<Object>]
}

enum ReportKind {
	case lastInterval
}

/// Metadata describing a report of stored objects.
struct ObjectReport {
	let id = UUID()
	var name: String = "Most Recent"
	var kind: ReportKind = .lastInterval
	var numberOfEntries: Int = 400
}
*/
