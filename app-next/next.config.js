const { injectWebpackDefinitionsIntoSassLoader } = require("./next.config-utils")

const locale = process.env.NEXT_PUBLIC_APP_LOCALE
const cockpitToken = process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN

module.exports = {
	i18n: {
		locales: [locale],
		defaultLocale: locale
	},
	webpack(config) {
		injectWebpackDefinitionsIntoSassLoader(config)
		return config
	},
	rewrites() {
		return [
			{
				source: "/cockpit/:path*",
				destination: `http://cockpit/:path*?token=${cockpitToken}`
			},
			{
				source: "/ps/:path*",
				destination: "http://plausible:8000/:path*"
			},
			{
				source: "/ps.js",
				destination: "http://plausible:8000/js/plausible.js"
			}
		]
	}
}
