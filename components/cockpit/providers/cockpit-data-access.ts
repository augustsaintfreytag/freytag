import axios from "axios"
import path from "path"

import CockpitResponse from "../models/cockpit-response"
import CockpitError from "../library/cockpit-error"
import { Configuration } from "~/components/configuration/configuration"
import { Url } from "~/components/library/url"

export default class CockpitDataAccess {

	// General Fetch

	static async data(route: string): Promise<CockpitResponse> {
		const url = CockpitDataAccess.preparedUrl(route)

		try {
			const serverResponse = await axios.get(url)
			return serverResponse.data as CockpitResponse
		} catch (err) {
			throw new CockpitError(`Could not get response from cockpit. ${err}`)
		}
	}

	// Preparation

	private static preparedUrl(route: string): Url {
		const token = Configuration.cmsToken()
		const host = Configuration.cmsHost()
		
		return `http://${path.join(host, route)}?token=${token}`
	}
	
}