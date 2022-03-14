import type { GetServerSideProps } from "next"
import { useEffect, useRef } from "react"
import { ApiError } from "~/api/common/errors/api-error"
import ContentAnchor, { ContentAnchorElement } from "~/components/content-anchor/components/content-anchor"
import Divider from "~/components/divider/divider"
import { useInputValidityReport } from "~/components/input/input-state/functions/input-validity-report-hook"
import InputTextArea from "~/components/input/input-text-area/input-text-area"
import InputTextField from "~/components/input/input-text-field/input-text-field"
import TitleInputTextField from "~/components/input/title-input-text-field/title-input-text-field"
import Notice from "~/components/notice/notice"
import { dispatchPageEvent } from "~/components/page-event/functions/page-event-hook"
import ThemeSprites from "~/components/sprites/theme-sprites"
import { useThemeCodePreviewContents } from "~/components/themes/theme-code-preview/functions/theme-code-preview-content-hook"
import ThemeCodePreviews from "~/components/themes/theme-code-previews/theme-code-previews"
import ThemeEditorColors from "~/components/themes/theme-editor-colors/theme-editor-colors"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import { useThemeEditorProperties } from "~/components/themes/theme-editor-properties/theme-editor-properties-hook"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import ThemeManifestDownloads from "~/components/themes/theme-manifest-downloads/theme-manifest-downloads"
import { useGeneratedThemeViaThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-generation-hook"
import { useDeferredThemeUtility } from "~/components/themes/theme-utility/functions/theme-utility-hook"
import WorkContentTextBlock from "~/components/work/work-content/components/work-content-text-block"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
import {
	themeDescriptionMaxLength,
	themeDescriptionMinLength,
	themeNameMaxLength,
	themeNameMinLength,
	themeNameValidationExpression
} from "~/utils/themes/functions/theme-configuration"
import { generateThemeViaApi } from "~/utils/themes/functions/theme-data-access"
import { useThemeManifestState } from "~/utils/themes/functions/theme-manifest-state-hook"
import { ThemeGenerationProperties } from "~/utils/themes/library/theme-generation-properties"
import { ThemeManifestStateKind } from "~/utils/themes/library/theme-manifest-state"
import styles from "./editor-page.module.sass"

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
	const [themeProperties, setThemeProperties, sanitizeThemeProperties] = useThemeEditorProperties()
	const [themeUtility, isLoadingThemeUtility, loadThemeUtility] = useDeferredThemeUtility()
	const generatedTheme = useGeneratedThemeViaThemeUtility(themeUtility, isLoadingThemeUtility, themeProperties.colors)

	const themePreviewContents = useThemeCodePreviewContents()
	const [themeManifestState, setThemeManifestStateTo] = useThemeManifestState({ kind: ThemeManifestStateKind.None })
	const [inputValidityReport, setInputValidityReport, allInputsValid] = useInputValidityReport()
	const inputsAnchorRef = useRef<ContentAnchorElement>(null)

	const onRequestThemesError = () => {
		inputsAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
		setTimeout(() => dispatchPageEvent("validateInputs"), 150)
	}

	const onRequestThemes = async () => {
		if (!allInputsValid()) {
			onRequestThemesError()
			return
		}

		setThemeManifestStateTo.pending()

		try {
			const properties: ThemeGenerationProperties = {
				name: themeProperties.name,
				description: themeProperties.description,
				colors: themeProperties.colors
			}

			const themeManifest = await generateThemeViaApi(properties)
			setThemeManifestStateTo.generated(themeManifest)

			return themeManifest
		} catch (error) {
			console.error(`Could not generate theme server-side.`, error)

			if (error instanceof ApiError) {
				setThemeManifestStateTo.error(`Invalid input`)
				onRequestThemesError()
			}

			setThemeManifestStateTo.error()
		}
	}

	useEffect(() => {
		loadThemeUtility()
	}, [])

	useEffect(() => {
		setThemeManifestStateTo.none()
	}, [themeProperties.hash])

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
					<ContentAnchor ref={inputsAnchorRef} anchor="inputs" />
					<TitleInputTextField
						className={className(styles.input, styles.nameInput)}
						value={themeProperties.name}
						setValue={setThemeProperties.name}
						name="Name"
						placeholder="Enter theme title…"
						required
						pattern={themeNameValidationExpression.source}
						minLength={themeNameMinLength}
						maxLength={themeNameMaxLength}
						onValidation={state => setInputValidityReport("name", state)}
						onBlur={sanitizeThemeProperties}
					/>
					<InputTextArea
						className={className(styles.input, styles.descriptionInput)}
						value={themeProperties.description}
						setValue={setThemeProperties.description}
						name="Description"
						placeholder="Enter theme description…"
						required
						minLength={themeDescriptionMinLength}
						maxLength={themeDescriptionMaxLength}
						onValidation={state => setInputValidityReport("description", state)}
					/>
					<InputTextField
						className={className(styles.input, styles.idInput)}
						value={themeProperties.id ?? "<None generated>"}
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
					<ThemeEditorColors className={styles.colors} colors={themeProperties.colors} onColorCollectionSet={setThemeProperties.colors} />
					<ThemeCodePreviews className={styles.previews} theme={generatedTheme} content={themePreviewContents} />
				</section>
				<section className={styles.tutorial}>
					<WorkContentTextBlock>
						Click each colour cell to edit and specify input colours. Themes are created from a sequence of *ten base colours*. An intermediate theme
						is generated and updated in real-time and previewed directly in the code display.
					</WorkContentTextBlock>
				</section>
				<Divider />
				<ThemeManifestDownloads name={themeProperties.name} state={themeManifestState} onRequest={onRequestThemes} />
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
