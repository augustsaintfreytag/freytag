import { FunctionComponent } from "react"
import { headerText } from "~/utils/brand/functions/brand-text"
import styles from "./header.module.sass"


}


type Props = {
	showsBrand: boolean
}

const { title: titleText, descriptor: descriptorText } = headerText()

const Header: FunctionComponent<Props> = props => (
	<header className={styles.header}>
		<div className={styles.inlay}>
			<section className={styles.leader}>
				{props.showsBrand && (
					<>
						<h1 className={styles.title}>{titleText}</h1>
						<div className={styles.descriptors}>{descriptorText}</div>
					</>
				)}
			</section>

			<nav className={styles.trailer}>
				<ol>
					<li>Home</li>
					<li>Life</li>
					<li>Work</li>
					<li>Imprint</li>
				</ol>
			</nav>
		</div>
	</header>
)

export default Header
