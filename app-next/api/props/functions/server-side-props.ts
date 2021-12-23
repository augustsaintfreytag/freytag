import type { UUID } from "~/api/common/library/uuid"
import {
	isServerSideNotFoundResponse,
	isServerSidePropsResponse,
	isServerSideRedirectResponse
} from "~/api/props/functions/server-side-response-guards"
import { serverSideNotFoundResponse } from "~/api/props/functions/server-side-response-presets"
import type { PromisedServerSideResponse, ServerSideContext, ServerSideResponse } from "~/api/props/library/server-side-response"

// Direct Fetch

export async function getServerSideResponse<Response, PageData>(
	resolveResponse: () => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedServerSideResponse<PageData> {
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
): PromisedServerSideResponse<PageData> {
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

type ResultBlock<PageData> = (previousResult?: ServerSideResponse<PageData>) => PromisedServerSideResponse<PageData>

export async function getServerSideResponses<PageData>(...blocks: ResultBlock<PageData>[]): PromisedServerSideResponse<PageData> {
	let aggregateResult: ServerSideResponse<PageData> | undefined

	for (const block of blocks) {
		const blockResult = await block(aggregateResult)
		aggregateResult = validateAndMergeServerSideResponses(blockResult, aggregateResult)

		if (isServerSideNotFoundResponse(aggregateResult)) {
			return aggregateResult
		}
	}

	return aggregateResult ?? serverSideNotFoundResponse
}

// Merging & Processing

function mergeServerSideResponses<PageData>(result: ServerSideResponse<PageData>, data?: PageData): ServerSideResponse<PageData> {
	if (isServerSidePropsResponse(result)) {
		return wrappedServerSideResult({ ...data, ...result.props.data })
	}

	return result
}

function validateAndMergeServerSideResponses<PageData>(
	result: ServerSideResponse<PageData>,
	aggregate?: ServerSideResponse<PageData>
): ServerSideResponse<PageData> {
	if (isServerSidePropsResponse(result)) {
		return wrappedServerSideResult({ ...aggregate, ...result.props.data })
	}

	if (isServerSideRedirectResponse(result)) {
		return result
	}

	return serverSideNotFoundResponse
}

function wrappedServerSideResult<PageData>(data: PageData): ServerSideResponse<PageData> {
	return { props: { data: { ...data } } }
}
