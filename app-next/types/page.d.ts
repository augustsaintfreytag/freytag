import { NextPage } from "next"
import { Router } from "next/router"
import { ComponentType } from "react"

export type QueryParameters = { [key: string]: any }

export type Page<P = {}> = NextPage<P> & {
	layout?: ComponentType
}

export type PageProps = {
	router: Router
}
