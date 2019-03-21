interface Route {
	route: string,
	payload: any
}

export default {
	
	buildDir: "/var/lib/nuxt/build",
	build: {
		extend (config: any, keys: any) {
			const isClient = keys.isClient as boolean
			
			if (isClient) {
				config.devtool = "eval-source-map"
			}
		}
	},
	plugins: ["~/plugins/paths.ts", "~/plugins/components.ts"],
	generate: {
		dir: "build/generated",
		routes: ["/maintenance/504", "/maintenance/502", "/maintenance/404"]
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
	}

}