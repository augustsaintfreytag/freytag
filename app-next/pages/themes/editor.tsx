import type { GetServerSideProps } from "next"
import { useEffect } from "react"
import Divider from "~/components/divider/divider"
import InputTextArea from "~/components/input/input-text-area/input-text-area"
import InputTextField from "~/components/input/input-text-field/input-text-field"
import TitleInputTextField from "~/components/input/title-input-text-field/title-input-text-field"
import { useLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
import Notice from "~/components/notice/notice"
import ThemeSprites from "~/components/sprites/theme-sprites"
import { useThemeCodePreviewContents } from "~/components/themes/theme-code-preview/functions/theme-code-preview-content-hook"
import ThemeCodePreviews from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeEditorColors from "~/components/themes/theme-editor-colors/theme-editor-colors"
import { useEditorColors } from "~/components/themes/theme-editor-colors/theme-editor-colors-hook"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import ThemeManifestDownloads from "~/components/themes/theme-manifest-downloads/theme-manifest-downloads"
import { useGeneratedThemeViaThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-generation-hook"
import { useDeferredThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-hook"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { range } from "~/utils/range/range"
import { generateThemeViaApi } from "~/utils/themes/functions/theme-data-access"
import { useThemeManifestState } from "~/utils/themes/functions/theme-manifest-state-hook"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifestStateKind } from "~/utils/themes/library/theme-manifest-state"
import { UUID } from "~/utils/uuid/uuid"
import styles from "./editor-page.module.sass"

// Configuration

const defaultColors = (() => {
	const colors = range(0, 10).map(_ => Color.white)
	colors[0] = Color.black

	return colors
})()

// Library

interface PageData {}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () => {
	return { props: {} }
}

const EditorPage: Page<PageProps & Props> = () => {
	const [themeId, setThemeId] = useLocalStorageState<UUID | undefined>("themes.editor.id", undefined)
	const [themeName, setThemeName] = useLocalStorageState("themes.editor.name", "")
	const [themeDescription, setThemeDescription] = useLocalStorageState("themes.editor.description", "")
	const [themeColors, setThemeColors] = useEditorColors(defaultColors)

	const [themeUtility, isLoadingThemeUtility, loadThemeUtility] = useDeferredThemeUtility()
	const generatedTheme = useGeneratedThemeViaThemeUtility(themeUtility, isLoadingThemeUtility, themeColors)

	const themePreviewContents = useThemeCodePreviewContents()
	const [themeManifestState, setThemeManifestStateTo] = useThemeManifestState({ kind: ThemeManifestStateKind.None })

	const onRequestThemes = async () => {
		console.log(`Requesting theme collection generation in editor.`)
		setThemeManifestStateTo.pending()

		try {
			const properties: ThemeGenerationProperties = {
				name: themeName,
				description: themeDescription,
				colors: themeColors
			}

			const themeManifest = await generateThemeViaApi(properties)
			setThemeManifestStateTo.generated(themeManifest)

			return themeManifest
		} catch (error) {
			console.error(`Could not generate theme server-side.`, error)
		}
	}

	useEffect(() => {
		loadThemeUtility()
	}, [])

	return (
		<>
			<ThemeSprites />
			<section className={styles.page}>
				<ThemeEditorMenu className={styles.menu} theme={generatedTheme} />
				<Notice className={styles.notice}>
					The Editor is currently in <em>Beta</em>. You can create a palette, edit colours, view generated previews in real-time, and download a
					preview. Submissions to the gallery and additional formats are coming soon.
				</Notice>
				<ThemeEditorTitle className={styles.title} />
				<section className={styles.inputs}>
					<TitleInputTextField
						className={className(styles.input, styles.nameInput)}
						value={themeName}
						setValue={setThemeName}
						name="Name"
						placeholder="Enter theme title…"
					/>
					<InputTextArea
						className={className(styles.input, styles.descriptionInput)}
						value={themeDescription}
						setValue={setThemeDescription}
						name="Description"
						placeholder="Enter theme description…"
					/>
					<InputTextField
						className={className(styles.input, styles.nameInput)}
						value={themeId ?? "<None>"}
						name="Identifier"
						placeholder="Auto-generated theme identifier…"
						readOnly
					/>
				</section>
				<section className={styles.tutorial}>
					<WorkContentTextBlock>
						Choose a short and fitting name for your theme. Good names give a hint of the included colours and communicate the intention behind the
						selected line-up. The description should give a brief introduction to where the theme comes from and for what it might be best used.
					</WorkContentTextBlock>
				</section>
				<section className={styles.colorsAndPreview}>
					<ThemeEditorColors className={styles.colors} colors={themeColors} onColorCollectionSet={setThemeColors} />
					<ThemeCodePreviews className={styles.previews} theme={generatedTheme} content={themePreviewContents} />
				</section>
				<section className={styles.tutorial}>
					<WorkContentTextBlock>
						Click each colour cell to edit and specify input colours. Themes are created from a sequence of *ten base colours*. An intermediate theme
						is generated and updated in real-time and previewed directly in the code display.
					</WorkContentTextBlock>
				</section>
				<Divider />
				<ThemeManifestDownloads name={themeName} state={themeManifestState} onRequest={onRequestThemes} />
				<Divider />
				<section className={styles.closure}>
					<WorkContentTextBlock>Themes can not be published to the gallery in this version of the Studio.</WorkContentTextBlock>
					<WorkContentTextBlock>Formats can be downloaded ad-hoc through the provided options.</WorkContentTextBlock>
				</section>
			</section>
		</>
	)
}

EditorPage.layout = DefaultLayout

export default EditorPage
