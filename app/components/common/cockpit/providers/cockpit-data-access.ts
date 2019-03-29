import axios from "axios"
import path from "path"

import { Configuration } from "~/components/common/configuration/configuration"
import { Url } from "~/components/common/library/url"
import CockpitError from "../library/cockpit-error"
import CockpitRequestOptions from "../models/cockpit-request-options"
import { CockpitCollectionResponse, CockpitSingletonResponse, AnyCockpitResponse } from "../models/cockpit-response"

export namespace CockpitDataAccess {

	type AnyRequestObject = {[key: string]: any}

	// Options
	
	function defaultOptions(): AnyRequestObject {
		return {
			populate: 3
		}
	}

	// Typed Fetch

	export async function recordsInCollection(collection: string, requestOptions?: CockpitRequestOptions): Promise<CockpitCollectionResponse> {
		const route = `api/collections/get/${collection}`
		return await data(route, requestOptions)
	}

	export async function singletonRecord(singleton: string, requestOptions?: CockpitRequestOptions): Promise<CockpitSingletonResponse> {
		const route = `api/singletons/get/${singleton}`
		return await data(route, requestOptions)
	}

	// General Fetch

	export async function data(route: string, requestOptions?: CockpitRequestOptions): Promise<AnyCockpitResponse> {
		const url = preparedUrl(route)

		try {
			const options = preparedOptions(defaultOptions(), requestOptions || {})
			const serverResponse = await axios.post(url, options)

			return serverResponse.data as CockpitCollectionResponse
		} catch (err) {
			throw new CockpitError(`Could not get response from cockpit. ${err}`)
		}
	}

	// Preparation

	function preparedUrl(route: string): Url {
		const connection = Configuration.Connections.cms
		
		const protocol = connection.protocol()
		const host = connection.host()
		const token = connection.token()
		
		return `${protocol}://${path.join(host, route)}?token=${token}`
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