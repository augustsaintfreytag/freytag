import { FunctionComponent } from "react"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./reiteration.module.sass"

const Reiteration: FunctionComponent<PropsWithAnyChildren> = props => <aside className={styles.block}>{props.children}</aside>

export default Reiteration
