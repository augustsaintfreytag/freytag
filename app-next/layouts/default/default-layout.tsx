import { FunctionComponent } from "react"
import DefaultLayoutFragment from "~/layouts/default/default-layout-fragment"
import { PropsWithAnyChildren } from "~/types/props"

const DefaultLayout: FunctionComponent<PropsWithAnyChildren> = props => <DefaultLayoutFragment showsBrand>{props.children}</DefaultLayoutFragment>

export default DefaultLayout
