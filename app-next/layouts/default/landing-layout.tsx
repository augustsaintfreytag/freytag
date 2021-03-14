import { FunctionComponent } from "react"
import DefaultLayoutFragment from "~/layouts/default/default-layout-fragment"
import { PropsWithAnyChildren } from "~/types/props"

const LandingLayout: FunctionComponent<PropsWithAnyChildren> = props => (
	<DefaultLayoutFragment>{props.children}</DefaultLayoutFragment>
)

export default LandingLayout
