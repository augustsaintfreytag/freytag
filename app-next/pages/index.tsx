import { NextPage } from "next"
import { ReactText } from "react"
import classNames from "./index.module.sass"

interface HeadingProps {
	children: ReactText
	// content: string
}

const IndexPage: NextPage = () => {
	return (
		<section className={classNames.welcomePane}>
			<div>…</div>
		</section>
	)
}

export default IndexPage
