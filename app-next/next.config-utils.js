// Webpack Loader Processing

function webpackSassLoaders(config) {
	const compositeRule = config.module.rules.filter(rule => rule.oneOf?.length)[0]
	const rules = compositeRule?.oneOf.filter(rule => Array.isArray(rule.use)) ?? []
	const sassLoaders = []

	// Inside OneOf<Rule>
	for (const rule of rules) {
		const definitions = rule.use?.filter(definition => definition.loader?.includes("sass-loader") && definition.options)
		sassLoaders.push(...definitions)
	}

	return sassLoaders
}

// Webpack Plugin Processing

function globalWebpackDefinePlugin(plugins) {
	const definePluginProbeKey = "process.browser"
	return firstElement(plugins, element => typeof element.definitions === "object" && element.definitions[definePluginProbeKey])
}

function globalWebpackDefinitions(plugins) {
	const definePlugin = globalWebpackDefinePlugin(plugins)
	const definitions = definePlugin?.definitions ?? {}

	return definitions
}

function globalEnvironmentDefinitions(rawDefinitions) {
	const definitions = {}
	const expression = /(process\.env\.)([A-Z].+)/

	for (const key in rawDefinitions) {
		if (!expression.test(key)) {
			continue
		}

		const definitionKey = key.replace(/process\.env\./, "")
		definitions[definitionKey] = rawDefinitions[key]
	}

	return definitions
}

// Contextual Webpack Modification

function injectWebpackDefinitionsIntoSassLoader(config) {
	// Inside each SASS loader
	const sassLoaders = webpackSassLoaders(config)
	const webpackEnvironmentDefinitions = globalWebpackDefinitions(config.plugins)
	const environmentDefinitions = globalEnvironmentDefinitions(webpackEnvironmentDefinitions)
	const sassEnvironmentDefinitions = Object.entries(environmentDefinitions).map(pair => {
		const [key, value] = pair
		const formattedKey = sassNotationFromEnvironmentKey(key)
		return `\$${formattedKey}: ${value}`
	})

	for (const sassLoader of sassLoaders) {
		sassLoader.options.additionalData = sassEnvironmentDefinitions.join("\n")
	}
}

// Common Utilities

function sassNotationFromEnvironmentKey(key) {
	const components = key.split("_")
	return components
		.map((component, index) => {
			const isFirstComponent = index === 0

			if (isFirstComponent) {
				return component.toLowerCase()
			}

			const leadingCharacter = component[0] ?? ""
			const trailingCharacters = component.substring(1) ?? ""
			return `${leadingCharacter.toUpperCase()}${trailingCharacters.toLowerCase()}`
		})
		.join("")
}

function firstElement(collection, condition) {
	for (const element of collection) {
		if (condition(element)) {
			return element
		}
	}

	return undefined
}

// Module

module.exports = {
	injectWebpackDefinitionsIntoSassLoader
}
