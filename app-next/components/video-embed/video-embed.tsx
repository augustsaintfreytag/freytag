import Head from "next/head"
import { FunctionComponent } from "react"
import styles from "./video-embed.module.sass"

type Props = {
	code: string
	aspect?: string
}

const playerColorCode = "ffffff"
const embedSrc = (code: string) => `https://player.vimeo.com/video/${code}?color=${playerColorCode}&byline=0&portrait=0`

const VideoEmbed: FunctionComponent<Props> = props => (
	<>
		<Head>
			<script key="vimeo-player" src="https://player.vimeo.com/api/player.js"></script>
		</Head>
		<div className={styles.video} style={{ paddingTop: props.aspect }}>
			<iframe src={embedSrc(props.code)} frameBorder="0" allowFullScreen />
		</div>
	</>
)

export default VideoEmbed
