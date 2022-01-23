import type { GetServerSideProps } from "next"
import { useState } from "react"
import InputTextArea from "~/components/input/input-text-area/input-text-area"
import TitleInputTextField from "~/components/input/title-input-text-field/title-input-text-field"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import { className } from "~/utils/class-names/class-name"
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
	const [themeName, setThemeName] = useState("")
	const [themeDescription, setThemeDescription] = useState("")

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
			</section>
		</>
	)
}

EditorPage.layout = DefaultLayout

export default EditorPage
