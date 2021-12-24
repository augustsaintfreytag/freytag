import type { GetServerSideProps } from "next"
import { RecordError } from "~/api/common/errors/record-error"
import { getAggregatingServerSideResponses, getServerSideResponseByQuery } from "~/api/props/functions/server-side-props"
import { isServerSidePropsResponse } from "~/api/props/functions/server-side-response-guards"
import { serverSideNotFoundResponse } from "~/api/props/functions/server-side-response-presets"
import { ServerSideResponse } from "~/api/props/library/server-side-response"
import { assetUrlFromComponent } from "~/api/records/asset/functions/asset-source-provider"
import { themeFromApi } from "~/api/records/themes/functions/theme-data-access"
import { intermediateThemeFileFromApi } from "~/api/records/themes/functions/theme-file-data-access"
import { themePackageFromTheme } from "~/api/records/themes/functions/theme-package-decoding"
import { Theme } from "~/api/records/themes/library/theme"
import { ThemeEditorFormat } from "~/api/records/themes/library/theme-editor-format"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import Markdown from "~/components/markdown/markdown"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta from "~/components/meta/meta-tags"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeClosure from "~/components/themes/theme-closure/theme-closure"
import {
	markdownTokenizedString,
	swiftTokenizedString,
	typeScriptTokenizedString
} from "~/components/themes/theme-code-preview/functions/tokenized-string-presets"
import ThemeCodePreviews, { CodeContent } from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeColorCollection from "~/components/themes/theme-color-collection/theme-color-collection"
import ThemeDownloads from "~/components/themes/theme-downloads/theme-downloads"
import ThemeMenu from "~/components/themes/theme-menu/theme-menu"
import { themeTagPropsFromTheme } from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemeTitle from "~/components/themes/theme-title/theme-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { colorsFromEncodedData } from "~/utils/colors/functions/color-conversion"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./theme-detail-page.module.sass"

// Library

interface PageData {
	theme: Theme
	file?: IntermediateTheme
}

interface Props {
	data?: PageData
}

// Fetch

async function getServerSideThemeFileProps(response?: ServerSideResponse<PageData>): Promise<ServerSideResponse<PageData>> {
	if (!isServerSidePropsResponse(response)) {
		return serverSideNotFoundResponse
	}

	const theme = response.props.data.theme!

	try {
		const themePackage = themePackageFromTheme(theme, ThemeEditorFormat.Intermediate)

		if (!themePackage) {
			throw new RecordError(`Theme package does not have an intermediate theme package or package URL.`)
		}

		const intermediateThemeFile = await intermediateThemeFileFromApi(themePackage)
		response.props.data.file = intermediateThemeFile

		return response
	} catch (error) {
		console.error(`Could not fetch intermediate theme package for theme '${theme.name}'.`, error)
		return response
	}
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context =>
	getAggregatingServerSideResponses(
		() => getServerSideResponseByQuery<Theme, PageData>(context, "theme", themeFromApi, theme => ({ theme })),
		getServerSideThemeFileProps
	)

const ThemePage: Page<PageProps & Props> = props => {
	const theme = props.data!.theme
	const intermediateThemeFile = props.data!.file

	const tags = themeTagPropsFromTheme(theme, false)
	const cover = theme.cover?.path
	const colors = colorsFromEncodedData(theme.colors)
	const downloads =
		theme.packages?.map(themePackage => {
			const format = themePackage.value.format
			const path = themePackage.value.file.path
			const href = assetUrlFromComponent(path)

			return { format, href }
		}) ?? []

	const accentColor = colors?.[2]
	const ThemeDivider = () => <Divider className={styles.divider} color={accentColor?.rgb} />

	const codePreviewContent: CodeContent[] = [
		{
			name: "Swift",
			symbol: "#Swift Symbol",
			content: swiftTokenizedString()
		},
		{
			name: "TypeScript",
			symbol: "#TypeScript Symbol",
			content: typeScriptTokenizedString()
		},
		{
			name: "Markdown",
			symbol: "#Markdown Symbol",
			content: markdownTokenizedString()
		}
	]

	return (
		<>
			<Meta href={canonicalHref(`/theme/${theme._id}`)} title={pageTitle(`${theme.name} Theme`)} />
			<ThemeSprites />
			<section className={styles.page}>
				<header>
					<ImageCover className={styles.cover} src={cover} />
					<ThemeMenu themes={{ current: theme }} />
				</header>
				<main>
					<ThemeTitle className={styles.title} text={theme.name} tags={tags} />
					<ThemeColorCollection className={styles.colors} colors={colors ?? []} />
					<div className={styles.abstract}>
						<Markdown>{theme.description}</Markdown>
					</div>
					<ThemeCodePreviews className={styles.previews} theme={intermediateThemeFile} content={codePreviewContent} />
					<ThemeDivider />
					<ThemeDownloads className={styles.downloads} name={theme.name} items={downloads} />
					<ThemeDivider />
					<ThemeClosure theme={theme} />
				</main>
			</section>
		</>
	)
}

ThemePage.layout = DefaultLayout

export default ThemePage
