import type { GetServerSideProps } from "next"
import { getServerSideApiResponseByQuery } from "~/api/props/functions/server-side-props"
import { themeFromApi } from "~/api/records/themes/functions/theme-data-access"
import { Theme } from "~/api/records/themes/library/theme"
import ImageCover from "~/components/image-cover/image-cover"
import { canonicalHref } from "~/components/meta/functions/canonical-href"
import { pageTitle } from "~/components/meta/functions/page-title"
import Meta from "~/components/meta/meta-tags"
import ThemeSprites from "~/components/sprites/theme-sprites"
import ThemeMenu from "~/components/themes/theme-menu/theme-menu"
import DefaultLayout from "~/layouts/default/default-layout"
import type { Page, PageProps } from "~/types/page"
import styles from "./theme-page.module.sass"

// Library

interface PageData {
	theme: Theme
}

interface Props {
	data?: PageData
}

// Page

export const getServerSideProps: GetServerSideProps<Props, {}> = async context =>
	getServerSideApiResponseByQuery(context, "theme", themeFromApi, theme => ({ theme }))

const ThemePage: Page<PageProps & Props> = props => {
	const theme = props.data!.theme
	const cover = theme.cover?.path

	return (
		<>
			<Meta href={canonicalHref(`/theme/${theme._id}`)} title={pageTitle(`${theme.name} Theme`)} />
			<ThemeSprites />
			<section className={styles.page}>
				<header>
					<ImageCover className={styles.cover} /> {/* TODO: Use `cover` value for `src` */}
				</header>
				<ThemeMenu themes={{ current: theme }} />
			</section>
		</>
	)
}

ThemePage.layout = DefaultLayout

export default ThemePage
