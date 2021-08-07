import { FunctionComponent } from "react"
import { PropsWithAnyChildren } from "~/types/props"
import styles from "./seo-block.module.sass"

const SeoBlock: FunctionComponent<PropsWithAnyChildren> = props => <aside className={styles.block}>{props.children}</aside>

export default SeoBlock
