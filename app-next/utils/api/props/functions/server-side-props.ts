import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { UUID } from "~/utils/api/common/library/uuid"

type PromisedServerSideResult<Data> = Promise<GetServerSidePropsResult<{ data?: Data }>>
type ServerSideContext = GetServerSidePropsContext<{}>

const ServerSideResultNotFound: GetServerSidePropsResult<{}> = { notFound: true }

export async function getServerSideApiRecord<Record, PageData>(
	context: ServerSideContext,
	queryKey: string,
	resolveRecord: (id: UUID) => Promise<Record | undefined>,
	mapRecord: (record: Record) => PageData
): PromisedServerSideResult<PageData> {
	const recordId = context.query[queryKey]

	if (!recordId || typeof recordId !== "string") {
		return ServerSideResultNotFound
	}

	try {
		const record = await resolveRecord(recordId)

		if (!record) {
			return ServerSideResultNotFound
		}

		const data = mapRecord(record)

		return {
			props: { data }
		}
	} catch (error) {
		return ServerSideResultNotFound
	}
}
