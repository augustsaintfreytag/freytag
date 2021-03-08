import { NextPage } from "next"
import { ReactText } from "react"
import classNames from "./index.module.sass"

interface HeadingProps {
	children: ReactText
	// content: string
}

const Heading = ({ children }: HeadingProps) => {
	return <div className={classNames.heading}>{children}</div>
}

const IndexPage: NextPage = () => {
	return (
		<section className={classNames.welcomePane}>
			<h1>Welcome</h1>
			<Heading>Hello</Heading>
		</section>
	)
}

export default IndexPage
