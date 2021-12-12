import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next"
import { UUID } from "~/api/common/library/uuid"

type NotFoundResult = { notFound: true }
type PropsResult<Data> = { props: { data: Data } }
type RedirectResult = { redirect: Redirect }

type PromisedServerSideResult<Data> = Promise<ServerSideResult<Data>>
type ServerSideResult<Data> = GetServerSidePropsResult<{ data: Data }>
type ServerSideContext = GetServerSidePropsContext<{}>

function isServerSidePropsResult<Data>(object: any): object is PropsResult<Data> {
	return typeof object === "object" && typeof object.props === "object"
}

function isServerSideNotFoundResult(object: any): object is NotFoundResult {
	return typeof object === "object" && typeof object.notFound === "boolean" && object.notFound === true
}

function isServerSideRedirectResult(object: any): object is RedirectResult {
	return typeof object === "object" && typeof object.redirect === "object"
}

const serverSideResultNotFound: NotFoundResult = { notFound: true }

export async function getServerSideApiResponseByQuery<Response, PageData>(
	context: ServerSideContext,
	queryKey: string,
	resolveResponse: (id: UUID) => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedServerSideResult<PageData> {
	const id = context.query[queryKey]

	if (!id || typeof id !== "string") {
		console.error(`Could not get server-side record, missing id for query key '${queryKey}'.`)
		return serverSideResultNotFound
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
		return serverSideResultNotFound
	}
}

export async function getServerSideApiResponse<Response, PageData>(
	resolveResponse: () => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedServerSideResult<PageData> {
	try {
		const response = await resolveResponse()
		if (!response) {
			return serverSideResultNotFound
		}

		const data = mapResponse(response)

		return {
			props: { data }
		}
	} catch (error) {
		return serverSideResultNotFound
	}
}

export async function getServerSideApiResponses<PageData>(...promises: PromisedServerSideResult<PageData>[]): PromisedServerSideResult<PageData> {
	const results: ServerSideResult<PageData>[] = await Promise.all(promises)
	let combinedData: PageData | undefined

	for (const result of results) {
		if (isServerSidePropsResult(result)) {
			combinedData = { ...(combinedData ?? {}), ...result.props.data }
			continue
		}

		if (isServerSideNotFoundResult(result)) {
			return serverSideResultNotFound
		}

		if (isServerSideRedirectResult(result)) {
			return result
		}
	}

	if (!combinedData) {
		return serverSideResultNotFound
	}

	return { props: { data: combinedData } }
}
