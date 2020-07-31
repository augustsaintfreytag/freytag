import { UrlComponent } from "~/components/common/library/url"

export interface PageLink {
	address: UrlComponent,
	name: string,
	spriteId?: string
}