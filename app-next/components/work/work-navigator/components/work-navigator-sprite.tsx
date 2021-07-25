import { FunctionComponent } from "react"
import Sprite from "~/components/sprites/sprite"
import { NavigatorSprite } from "~/components/work/work-navigator/library/work-navigator-sprite"

interface Props {
	sprite: NavigatorSprite
}

const WorkNavigatorSprite: FunctionComponent<Props> = props => <Sprite href={`#${props.sprite}`} />

export default WorkNavigatorSprite
