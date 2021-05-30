const { injectWebpackDefinitionsIntoSassLoader } = require("./next.config-utils")

module.exports = {
	i18n: {
		locales: ["en-GB"],
		defaultLocale: "en-GB"
	},
	webpack(config) {
		injectWebpackDefinitionsIntoSassLoader(config)
		return config
	},
	future: {
		webpack5: true
	}
}
