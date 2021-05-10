import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { UUID } from "~/api/common/library/uuid"

type PromisedServerSideResult<Data> = Promise<GetServerSidePropsResult<{ data?: Data }>>
type ServerSideContext = GetServerSidePropsContext<{}>

const ServerSideResultNotFound: GetServerSidePropsResult<{}> = { notFound: true }

export async function getServerSideApiResponseByQuery<Response, PageData>(
	context: ServerSideContext,
	queryKey: string,
	resolveResponse: (id: UUID) => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedServerSideResult<PageData> {
	const id = context.query[queryKey]

	if (!id || typeof id !== "string") {
		return ServerSideResultNotFound
	}

	try {
		const response = await resolveResponse(id)

		if (!response) {
			return ServerSideResultNotFound
		}

		const data = mapResponse(response)

		return {
			props: { data }
		}
	} catch (error) {
		return ServerSideResultNotFound
	}
}

export async function getServerSideApiResponse<Response, PageData>(
	resolveResponse: () => Promise<Response | undefined>,
	mapResponse: (response: Response) => PageData
): PromisedServerSideResult<PageData> {
	try {
		const response = await resolveResponse()
		if (!response) {
			return ServerSideResultNotFound
		}

		const data = mapResponse(response)

		return {
			props: { data }
		}
	} catch (error) {
		return ServerSideResultNotFound
	}
}

// export async function tryAsync<ReturnValue>()
