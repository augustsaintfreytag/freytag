interface Route {
	route: string,
	payload: any
}

export default {
	buildModules: ["@nuxt/typescript-build"],
	buildDir: ".output",
	build: {
		extend (config: any, keys: any) {
			const isClient = keys.isClient as boolean
			
			if (isClient) {
				config.devtool = "eval-source-map"
			}
		}
	},
	plugins: [
		{ src: "@/plugins/decorator-metadata.ts" },
		{ src: "@/plugins/cockpit-access.ts" },
		{ src: "@/plugins/paths.ts" }
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
		"@/assets/style/base.scss",
		"@/layouts/default.scss",
		"@/components/header/header.scss"
	]
}