import { FunctionComponent } from "react"
import SeoBlock from "~/components/seo/seo-block"

interface Props {
	aside?: string
}

const WorkListSeo: FunctionComponent<Props> = props => (
	<SeoBlock>
		<p>Collection of work showcases, a personal view into past and current projects of August Saint Freytag.</p>
		<p>
			Showcases offer diverse insights and retrospectives to in-progress or completed ventures and projects, compiled and written by August Saint
			Freytag. The covered work includes photographic series, film, video, and music video productions, behind the scenes looks, conceptual designs,
			interactive experiences, apps, and other projects.
		</p>
	</SeoBlock>
)

export default WorkListSeo
