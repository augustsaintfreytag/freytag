const { injectWebpackDefinitionsIntoSassLoader } = require("./next.config-utils")
const locale = process.env.NEXT_PUBLIC_APP_LOCALE

module.exports = {
	i18n: {
		locales: [locale],
		defaultLocale: locale
	},
	webpack(config) {
		injectWebpackDefinitionsIntoSassLoader(config)
		return config
	},
	future: {
		webpack5: true
	}
}
