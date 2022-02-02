import type { GetServerSideProps } from "next"
import { useEffect, useMemo, useState } from "react"
import InputTextArea from "~/components/input/input-text-area/input-text-area"
import TitleInputTextField from "~/components/input/title-input-text-field/title-input-text-field"
import { useEncodedLocalStorageState } from "~/components/local-storage/functions/local-storage-hook"
import ThemeSprites from "~/components/sprites/theme-sprites"
import { useThemeCodePreviewContents } from "~/components/themes/theme-code-preview/functions/theme-code-preview-content-hook"
import ThemeCodePreviews from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeEditorColors from "~/components/themes/theme-editor-colors/theme-editor-colors"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import { generateThemeViaModule } from "~/components/themes/theme-utility/functions/theme-utility-functions"
import { useDeferredThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-hook"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
import { Color, ColorValue } from "~/utils/colors/models/color"
import { performanceMeasureDuration, startPerformanceMeasure, stopPerformanceMeasure } from "~/utils/performance/performance"
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

function useEditorColors(initialColors: Color[]): [colors: Color[], setColors: (newColors: Color[]) => void] {
	const encodeColors = (colors: Color[]) => JSON.stringify(colors)
	const decodeColors = (value: string) => {
		try {
			const colorValues = JSON.parse(value) as ColorValue[]
			const colors = colorValues.map(colorValue => Color.fromValue(colorValue))

			return colors
		} catch {
			return []
		}
	}

	return useEncodedLocalStorageState<Color[]>("theme-editor-colors", encodeColors, decodeColors, initialColors)
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async () => {
	return { props: {} }
}

const EditorPage: Page<PageProps & Props> = () => {
	const [themeName, setThemeName] = useState("")
	const [themeDescription, setThemeDescription] = useState("")
	const [themeColors, setThemeColors] = useEditorColors(defaultColors)

	const keyForColors = (colors: Color[]): string => colors.map(color => color.key).join("/")

	const [lastUsedColorKey, setLastUsedColorKey] = useState<string | undefined>(undefined)
	const [generatedTheme, setGeneratedTheme] = useState<IntermediateTheme | undefined>(undefined)
	const [themeUtility, isLoadingThemeUtility, loadThemeUtility] = useDeferredThemeUtility()
	const themePreviewContents = useThemeCodePreviewContents()

	useEffect(() => {
		loadThemeUtility()
	}, [])

	useEffect(() => {
		if (!themeUtility) {
			return
		}

		const currentColorKey = keyForColors(themeColors)
		if (currentColorKey === lastUsedColorKey) {
			return
		}

		;(async () => {
			startPerformanceMeasure(PerformanceKey.GenerateTheme)
			const theme = await generateThemeViaModule(themeUtility, themeColors)
			stopPerformanceMeasure(PerformanceKey.GenerateTheme)

			console.log(`Generated theme from all colors in ${performanceMeasureDuration(PerformanceKey.GenerateTheme)}.`)

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
				<ThemeEditorMenu theme={generatedTheme} />
				<ThemeEditorTitle className={styles.title} />
				<section className={styles.inputs}>
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
			</section>
		</>
	)
}

EditorPage.layout = DefaultLayout

export default EditorPage
