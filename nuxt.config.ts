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
	plugins: ["~/plugins/paths.ts"]

}