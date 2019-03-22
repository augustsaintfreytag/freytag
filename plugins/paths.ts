import { Url } from "~/components/common/library/url"
import { Configuration } from "~/components/common/configuration/configuration"

namespace PathProvider {

	export function cockpitPath(pathComponent: string): Url {
		const connection = Configuration.Connections.cms
		return `${connection.protocol(Configuration.Context.Client)}://${connection.host(Configuration.Context.Client)}${pathComponent}`
	}

}

export default ({ app }) => {
	app.methods.managedResourcePath = (pathComponent: string): Url => {
		return PathProvider.cockpitPath(pathComponent)
	}
}