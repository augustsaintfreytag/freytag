const { injectWebpackDefinitionsIntoSassLoader } = require("./next.config-utils")

const locale = process.env.NEXT_PUBLIC_APP_LOCALE
const cockpitToken = process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN

module.exports = {
	i18n: {
		locales: [locale],
		defaultLocale: locale
	},
	webpackDevMiddleware(config) {
		config.watchOptions = {
			poll: 500,
			aggregateTimeout: 250
		}

		return config
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
			},
			{
				source: "/content/:path*",
				destination: "http://app-content/:path*"
			}
		]
	}
}
