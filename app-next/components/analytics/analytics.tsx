import Head from "next/head"
import { FunctionComponent } from "react"

interface Props {
	disabled?: boolean
}

const Analytics: FunctionComponent<Props> = props => (
	<>
		{!props.disabled && (
			<Head>
				<script async defer data-domain="augustfreytag.com" src="/ps.js"></script>
			</Head>
		)}
	</>
)

export default Analytics
