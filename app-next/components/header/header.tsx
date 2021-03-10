import { FunctionComponent } from "react"
import styles from "./header.module.sass"

function headerText(): [title: string, descriptor: string] {
	const titleText = "August Saint Freytag"
	const descriptors = ["Concept Designer", "Video Artist", "Developer", "Editor", "Storyteller"]
	const descriptorSeparator = "/"
	const descriptorText = descriptors.join(` ${descriptorSeparator} `)

	return [titleText, descriptorText]
}

const [titleText, descriptorText] = headerText()

const Header: FunctionComponent = () => (
	<header className={styles.header}>
		<section className={styles.leader}>
			<h1 className={styles.title}>{titleText}</h1>
			<div className={styles.descriptors}>{descriptorText}</div>
		</section>
		<nav className={styles.trailer}>
			<ol>
				<li>Home</li>
				<li>Life</li>
				<li>Work</li>
				<li>Imprint</li>
			</ol>
		</nav>
	</header>
)

export default Header
