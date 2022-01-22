import type { GetServerSideProps } from "next"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeEditorMenu from "~/components/themes/theme-editor-menu/theme-editor-menu"
import ThemeEditorTitle from "~/components/themes/theme-editor-title/theme-editor-title"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
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
	return (
		<>
			<ThemeSprites />
			<section className={styles.page}>
				<ThemeEditorMenu />
				<ThemeEditorTitle className={styles.title} />
			</section>
		</>
	)
}

EditorPage.layout = DefaultLayout

export default EditorPage
