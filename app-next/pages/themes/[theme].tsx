import type { GetServerSideProps } from "next"
import { useMemo } from "react"
import { routedAssetUrlFromComponent } from "~/api/cockpit/records/asset/functions/asset-source-provider"
import { themeFromApi } from "~/api/cockpit/records/themes/functions/theme-data-access"
import { intermediateThemeFileFromApi } from "~/api/cockpit/records/themes/functions/theme-file-data-access"
import { themePackageFromTheme } from "~/api/cockpit/records/themes/functions/theme-package-decoding"
import { Theme } from "~/api/cockpit/records/themes/library/theme"
import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { ApiError } from "~/api/common/errors/api-error"
import { getAggregatingServerSideResponses, getServerSideResponseByQuery } from "~/api/common/props/functions/server-side-props"
import { isServerSidePropsResponse } from "~/api/common/props/functions/server-side-response-guards"
import { serverSideNotFoundResponse } from "~/api/common/props/functions/server-side-response-presets"
import { ServerSideResponse } from "~/api/common/props/library/server-side-response"
import Divider from "~/components/divider/divider"
import ImageCover from "~/components/image-cover/image-cover"
import ThemeSprites from "~/components/sprites/theme-sprites"
import TextBlock from "~/components/text-block/text-block"
import ThemeMeta from "~/components/themes/thema-meta/theme-meta"
import ThemeClosure from "~/components/themes/theme-closure/theme-closure"
import { themeCodePreviewContents } from "~/components/themes/theme-code-preview/functions/theme-code-preview-content"
import ThemeCodePreviews from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeColorCollection from "~/components/themes/theme-color-collection/theme-color-collection"
import ThemeDownloads from "~/components/themes/theme-downloads/theme-downloads"
import ThemeMenu from "~/components/themes/theme-menu/theme-menu"
import {
	themeFormatSet,
	themePackagesFromTheme,
	themeTagPropsFromTheme
} from "~/components/themes/theme-preview/functions/theme-preview-prop-mapping"
import ThemeReiteration from "~/components/themes/theme-reiteration/theme-reiteration"
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
		const themePackage = themePackageFromTheme(theme, ThemeFormat.Intermediate)

		if (!themePackage) {
			throw new ApiError(`Theme package does not have an intermediate theme package or package URL.`)
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

	const tags = themeTagPropsFromTheme(theme, false, true)
	const cover = theme.cover?.path
	const colors = colorsFromEncodedData(theme.colors)
	const packages = themePackagesFromTheme(theme)
	const downloads =
		packages.map(themePackage => {
			const name = theme.name
			const format = themePackage.format
			const path = themePackage.file.path
			const href = routedAssetUrlFromComponent(path)

			return { name, format, href }
		}) ?? []

	const accentColor = colors?.[2]
	const ThemeDivider = () => <Divider className={styles.divider} color={accentColor?.rgb} />
	const codePreviewContent = useMemo(() => themeCodePreviewContents(), [])

	return (
		<>
			<ThemeMeta theme={theme} />
			<ThemeSprites />
			<section className={styles.page}>
				<header>
					<ImageCover className={styles.cover} src={cover} />
					<ThemeMenu themes={{ current: theme }} />
				</header>
				<main>
					<ThemeTitle className={styles.title} text={theme.name} tags={tags} />
					<ThemeReiteration name={theme.name} formats={themeFormatSet(packages)} />
					<ThemeColorCollection className={styles.colors} colors={colors ?? []} />
					<div className={styles.abstract}>
						<TextBlock>{theme.description}</TextBlock>
					</div>
					<ThemeCodePreviews
						className={styles.previews}
						contentClassName={styles.previewsContent}
						theme={intermediateThemeFile}
						content={codePreviewContent}
						windowed
					/>
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
