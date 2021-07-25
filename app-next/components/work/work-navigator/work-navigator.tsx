import { FunctionComponent, useMemo } from "react"
import { ResolvedCollectionLink } from "~/api/records/work-showcase/library/work-showcase"
import { AnyWorkShowcaseContent } from "~/api/records/work-showcase/library/work-showcase-content"
import WorkNavigatorSprite from "~/components/work/work-navigator/components/work-navigator-sprite"
import { navigatorSpriteForBlock } from "~/components/work/work-navigator/functions/work-navigator-sprite-mapping"
import { NavigatorSprite } from "~/components/work/work-navigator/library/work-navigator-sprite"

interface Props {
	blockLinks: ResolvedCollectionLink<AnyWorkShowcaseContent>[]
}

const WorkNavigator: FunctionComponent<Props> = props => {
	const blockLinkIds = props.blockLinks.map(link => link.value._id)
	const sprites = useMemo(() => props.blockLinks.map(link => navigatorSpriteForBlock(link) ?? NavigatorSprite.Text), [blockLinkIds])

	return (
		<section>
			<ol>
				{sprites.map((sprite, index) => (
					<li key={index}>
						<WorkNavigatorSprite sprite={sprite} />
					</li>
				))}
			</ol>
		</section>
	)
}

export default WorkNavigator
