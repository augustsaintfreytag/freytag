import { NuxtConfig } from "@nuxt/types"

interface Route {
	route: string,
	payload: any
}

const config: NuxtConfig = {
	buildModules: ["@nuxt/typescript-build"],
	buildDir: ".output",
	build: {
		extend (config: any, keys: any) {
			const isClient = keys.isClient as boolean
			
			if (isClient) {
				config.devtool = "eval-source-map"
			}
		},
		filenames: {
			app: ({isDev}) => isDev ? "[name].[hash].js" : "[chunkhash].js",
			chunk: ({isDev}) => isDev ? "[name].[hash].js" : "[chunkhash].js",
		}
	},
	plugins: [
		{ src: "plugins/decorator-metadata.ts" },
		{ src: "plugins/cockpit-access.ts" },
		{ src: "plugins/paths.ts" }
	],
	generate: {
		dir: "build/generated",
		routes: ["/maintenance/404", "/maintenance/50X"]
	},
	hooks: {
		generate: {
			extendRoutes: async (routeEntries: Route[]) => {
				const whitelistedRoutes = ["/maintenance"]
				const filteredRoutes = routeEntries.filter(routeEntry => {
					for (const whitelistedRoute of whitelistedRoutes) {
						if (routeEntry.route.includes(whitelistedRoute)) {
							return true
						}
					}
				})

				routeEntries.splice(0, routeEntries.length, ...filteredRoutes)
			}
		}
	},
	css: [
		"assets/style/base.scss",
		"layouts/default-layout.scss",
		"components/page-header/page-header.scss"
	]
}

export default config