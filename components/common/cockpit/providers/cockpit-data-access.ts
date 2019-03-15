import axios from "axios"
import path from "path"

import CockpitResponse from "../models/cockpit-response"
import CockpitError from "../library/cockpit-error"
import { Configuration } from "~/components/common/configuration/configuration"
import { Url } from "~/components/common/library/url"

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

	// Typed Fetch

	static async recordsInCollection(collection: string): Promise<CockpitResponse> {
		const route = `api/collections/get/${collection}`
		return await CockpitDataAccess.data(route)
	}

	// Preparation

	private static preparedUrl(route: string): Url {
		const token = Configuration.cmsToken()
		const host = Configuration.cmsHost()
		
		return `http://${path.join(host, route)}?token=${token}`
	}

	function preparedOptions(baseOptions: AnyRequestObject, requestOptions: AnyRequestObject): AnyRequestObject {
		const mergedOptions = baseOptions
		
		for (const key in requestOptions) {
			const value = requestOptions[key]
			
			if (typeof value === "object" && value !== null) {
				mergedOptions[key] = preparedOptions(mergedOptions[key] || {}, value)
			} else {
				mergedOptions[key] = value
			}
		}

		return mergedOptions
	}
	
}