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
