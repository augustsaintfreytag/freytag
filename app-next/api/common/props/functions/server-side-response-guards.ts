import { NotFoundResponse, PropsResponse, RedirectResponse } from "~/api/common/props/library/server-side-response"

export function isServerSidePropsResponse<Data>(object: any): object is PropsResponse<Data> {
	return typeof object === "object" && typeof object.props === "object"
}

export function isServerSideNotFoundResponse(object: any): object is NotFoundResponse {
	return typeof object === "object" && typeof object.notFound === "boolean" && object.notFound === true
}

export function isServerSideRedirectResponse(object: any): object is RedirectResponse {
	return typeof object === "object" && typeof object.redirect === "object"
}
