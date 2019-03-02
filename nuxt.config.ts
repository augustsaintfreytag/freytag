export default {
	dev: true,
	mode: "spa",
	buildDir: "/var/lib/nuxt/build",
	build: {
		extend (config: any, keys: any) {
			const isClient = keys.isClient as Boolean
			
			if (isClient) {
				config.devtool = "eval-source-map"
			}
		}
	}
}