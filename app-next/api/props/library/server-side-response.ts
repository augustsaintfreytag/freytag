import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next"

export type NotFoundResponse = { notFound: true }
export type PropsResponse<Data> = { props: { data: Data } }
export type RedirectResponse = { redirect: Redirect }

export type PromisedServerSideResponse<Data> = Promise<ServerSideResponse<Data>>
export type ServerSideResponse<Data> = GetServerSidePropsResult<{ data: Data }>
export type ServerSideContext = GetServerSidePropsContext<{}>
