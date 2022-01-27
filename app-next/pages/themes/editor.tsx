import type { GetServerSideProps } from "next"
import { useEffect, useMemo, useState } from "react"
import InputTextArea from "~/components/input/input-text-area/input-text-area"
import TitleInputTextField from "~/components/input/title-input-text-field/title-input-text-field"
import ThemeSprites from "~/components/sprites/theme-sprites"
import { themeCodePreviewContent } from "~/components/themes/theme-code-preview/functions/theme-code-preview-content"
import ThemeCodePreviews from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeColorCollection from "~/components/themes/theme-color-collection/theme-color-collection"
import ThemeEditorColorMenu from "~/components/themes/theme-editor-color-menu/theme-editor-color-menu"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import { generateThemeViaModule } from "~/components/themes/theme-utility/functions/theme-utility-functions"
import { useDeferredThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-hook"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
import { Color } from "~/utils/colors/models/color"
import { performanceMeasure, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
import { range } from "~/utils/range/range"
import { IntermediateTheme } from "~/utils/themes/library/intermediate-theme"
import styles from "./editor-page.module.sass"

// Configuration

const defaultColors = (() => {
	const colors = range(0, 10).map(_ => Color.white)
	colors[0] = Color.black

	return colors
})()

enum PerformanceKey {
	GenerateTheme = "editor-generate-theme"
}

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
	const [themeName, setThemeName] = useState("")
	const [themeDescription, setThemeDescription] = useState("")
	const [themeColors, setThemeColors] = useState<Color[]>(defaultColors)

	const onColorCollectionSet = (index: number, newColor: Color) => {
		const newColors = [...themeColors]
		newColors[index] = newColor

		setThemeColors(newColors)
	}

	const keyForColors = (colors: Color[]): string => colors.map(color => color.key).join("/")

	const [lastUsedColorKey, setLastUsedColorKey] = useState<string | undefined>(undefined)
	const [generatedTheme, setGeneratedTheme] = useState<IntermediateTheme | undefined>(undefined)
	const [themeUtility, isLoadingThemeUtility, loadThemeUtility] = useDeferredThemeUtility()
	const themePreviewContent = useMemo(() => themeCodePreviewContent(), [])

	useEffect(() => {
		if (!isLoadingThemeUtility) {
			loadThemeUtility()
		}
	}, [])

	useEffect(() => {
		const currentColorKey = keyForColors(themeColors)
		if (currentColorKey === lastUsedColorKey) {
			return
		}

		;(async () => {
			// Wait for theme utility load if not already preloaded.
			await loadThemeUtility()

			startPerformanceMeasure(PerformanceKey.GenerateTheme)
			const theme = await generateThemeViaModule(themeUtility!, themeColors)
			stopPerformanceMeasure(PerformanceKey.GenerateTheme)

			console.log(`Generated theme from all colors in ${performanceMeasure(PerformanceKey.GenerateTheme).duration}ms.`)

			if (!theme) {
				console.error(`Could not generate theme from colors '${themeColors.map(color => color.hex)}'.`)
			}

			setLastUsedColorKey(currentColorKey)
			setGeneratedTheme(theme)
		})()
	}, [isLoadingThemeUtility, themeColors])

	return (
		<>
			<ThemeSprites />
			<section className={styles.page}>
				<ThemeEditorMenu />
				<ThemeEditorTitle className={styles.title} />
				<div className={styles.inputs}>
					<TitleInputTextField
						className={className(styles.input, styles.nameInput)}
						value={themeName}
						setValue={setThemeName}
						name={"Name"}
						placeholder="Enter theme title…"
					/>
					<InputTextArea
						className={className(styles.input, styles.descriptionInput)}
						value={themeDescription}
						setValue={setThemeDescription}
						name={"Description"}
						placeholder="Enter theme description…"
					/>
				</div>
				<div className={styles.tutorial}>
					<WorkContentTextBlock>
						Choose a short and fitting name for your theme. Good names give a hint of the included colours and communicate the intention behind the
						selected line-up. The description should give a brief introduction to where the theme comes from and for what it might be best used.
					</WorkContentTextBlock>
				</div>
				<ThemeColorCollection className={styles.colors} colors={themeColors} setColor={onColorCollectionSet} editable />
				<ThemeEditorColorMenu className={styles.colorMenu} getColors={() => themeColors} onChangeColors={newColors => setThemeColors(newColors)} />
				<div className={styles.tutorial}>
					<WorkContentTextBlock>
						Click each colour cell to edit and specify input colours. Themes are created from a sequence of *ten base colours*. An intermediate theme
						is generated and updated in real-time and previewed directly in the code display.
					</WorkContentTextBlock>
				</div>
				<ThemeCodePreviews className={styles.previews} theme={generatedTheme} content={themePreviewContent} />
			</section>
		</>
	)
}

EditorPage.layout = DefaultLayout

export default EditorPage
