import type { UUID } from "~/api/common/library/uuid"
import {
	isServerSideNotFoundResponse,
	isServerSidePropsResponse,
	isServerSideRedirectResponse
} from "~/api/props/functions/server-side-response-guards"
import { serverSideNotFoundResponse } from "~/api/props/functions/server-side-response-presets"
import type { ServerSideContext, ServerSideResponse } from "~/api/props/library/server-side-response"

// Library

type PromisedResponse<Data> = Promise<ServerSideResponse<Data>>
type PromisedResponseOrFallback<Data> = Promise<ServerSideResponse<Data> | undefined>
type AggregatingResultBlock<PageData> = (previousResponse?: ServerSideResponse<PageData>) => PromisedResponse<PageData>

// Direct Fetch

export async function getServerSideResponse<Response, PageData>(
	resolveResponse: () => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedResponse<PageData> {
	try {
		const response = await resolveResponse()
		if (!response) {
			return serverSideNotFoundResponse
		}

		const data = mapResponse(response)

		return {
			props: { data }
		}
	} catch (error) {
		return serverSideNotFoundResponse
	}
}

// Query-Defined Fetch

export async function getServerSideResponseByQuery<Response, PageData>(
	context: ServerSideContext,
	queryKey: string,
	resolveResponse: (id: UUID) => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedResponse<PageData> {
	const id = context.query[queryKey]

	if (!id || typeof id !== "string") {
		console.error(`Could not get server-side record, missing id for query key '${queryKey}'.`)
		return serverSideNotFoundResponse
	}

	try {
		const response = await resolveResponse(id)

		if (!response) {
			throw new TypeError(`Resolve did not return a record.`)
		}

		const data = mapResponse(response)

		return {
			props: { data }
		}
	} catch (error) {
		console.error(`Could not get server-side record '${id}' for query key '${queryKey}'. ${error}`)
		return serverSideNotFoundResponse
	}
}

// Sequential Fetch

export async function getServerSideResponses<PageData>(...blocks: PromisedResponse<PageData>[]): PromisedResponse<PageData> {
	const responses = await Promise.all(blocks)
	let aggregateResponse: ServerSideResponse<PageData> | undefined

	for (const response of responses) {
		aggregateResponse = validateAndMergeServerSideResponses(response, aggregateResponse)

		if (isServerSideNotFoundResponse(aggregateResponse)) {
			return aggregateResponse
		}
	}

	return aggregateResponse ?? serverSideNotFoundResponse
}

export async function getAggregatingServerSideResponses<PageData>(...blocks: AggregatingResultBlock<PageData>[]): PromisedResponse<PageData> {
	let aggregateResponse: ServerSideResponse<PageData> | undefined

	for (const block of blocks) {
		const response = await block(aggregateResponse)
		aggregateResponse = validateAndMergeServerSideResponses(response, aggregateResponse)

		if (isServerSideNotFoundResponse(aggregateResponse)) {
			return aggregateResponse
		}
	}

	return aggregateResponse ?? serverSideNotFoundResponse
}

export function discardingServerSideError<PageData>(block: AggregatingResultBlock<PageData>): AggregatingResultBlock<PageData> {
	return async (previousResponse?: ServerSideResponse<PageData>): PromisedResponse<PageData> => {
		const blockResponse = await block(previousResponse)

		if (!isServerSidePropsResponse(blockResponse)) {
			if (!previousResponse) {
				console.error(
					`Could not proceed discarding error for server-side fetch, no previous response or fallback provided. Will return not found fallback response.`
				)

				return serverSideNotFoundResponse
			}

			return previousResponse
		}

		return blockResponse
	}
}

// Merging & Processing

function mergeServerSideResponses<PageData>(response: ServerSideResponse<PageData>, data?: PageData): ServerSideResponse<PageData> {
	if (isServerSidePropsResponse(response)) {
		return wrappedServerSideResult({ ...data, ...response.props.data })
	}

	return response
}

function validateAndMergeServerSideResponses<PageData>(
	response: ServerSideResponse<PageData>,
	aggregate?: ServerSideResponse<PageData>
): ServerSideResponse<PageData> {
	if (isServerSideRedirectResponse(response)) {
		return response
	}

	if (isServerSideNotFoundResponse(response)) {
		return response
	}

	if ((!aggregate || isServerSidePropsResponse(aggregate)) && isServerSidePropsResponse(response)) {
		return wrappedServerSideResult({ ...aggregate?.props.data, ...response.props.data })
	}

	return serverSideNotFoundResponse
}

function wrappedServerSideResult<PageData>(data: PageData): ServerSideResponse<PageData> {
	return { props: { data: { ...data } } }
}
