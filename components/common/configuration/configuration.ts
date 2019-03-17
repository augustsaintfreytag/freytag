import { Url } from "../library/url"
import { CmsConnection } from "./cms-connection";

export namespace Configuration {

	export type Protocol = string
	export type ApiToken = string

	export interface Connection {
		protocol(): Protocol
		host(): Url
		token(): ApiToken
	}

	export enum Context {
		Client,
		Server
	}

	export namespace Connections {
		export const cms = new CmsConnection()
	}

}