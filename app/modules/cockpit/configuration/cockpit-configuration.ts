import { URL } from "../../common/library/url"
import { CockpitConnection } from "./cockpit-connection"

export type Protocol = string
export type APIToken = string

export interface Connection {
	protocol(): Protocol
	host(): URL
	token(): APIToken
}

export enum Environment {
	Live = "LIVE",
	Development = "DEVELOPMENT"
}

export enum Context {
	Server,
	Client
}

export namespace Connections {
	export const cms = new CockpitConnection()
}