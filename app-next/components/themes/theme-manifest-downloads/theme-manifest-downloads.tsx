import { FunctionComponent, useRef } from "react"
import { ThemeFormat } from "~/api/cockpit/records/themes/library/theme-format"
import { Props as ThemeDownloadItemProps } from "~/components/themes/theme-downloads/components/theme-download-item"
import ThemeDownloadList from "~/components/themes/theme-downloads/components/theme-download-list"
import { PropsWithClassName } from "~/types/props"
import { className } from "~/utils/class-names/class-name"
import { URL } from "~/utils/routing/library/url"
import { generatedThemeFormats } from "~/utils/themes/functions/theme-configuration"
import { publicThemeFilePathFromManifest } from "~/utils/themes/functions/theme-resources"
import { ThemeManifest } from "~/utils/themes/library/theme-manifest"
import { ThemeManifestState, ThemeManifestStateKind } from "~/utils/themes/library/theme-manifest-state"
import styles from "./theme-manifest-downloads.module.sass"

interface Props extends PropsWithClassName {
	name: string
	state: ThemeManifestState
	onRequest?: () => Promise<ThemeManifest | undefined>
}

const ThemeManifestDownloads: FunctionComponent<Props> = props => {
	const anchorRef = useRef<HTMLAnchorElement>(null)

	const downloadResource = (path: URL) => {
		const element = anchorRef.current
		if (!element) {
			return
		}

		element.href = path
		element.click()
	}

	const downloadResourceViaManifest = (manifest: ThemeManifest, format: ThemeFormat) => {
		const resourcePath = publicThemeFilePathFromManifest(manifest, format)

		if (!resourcePath) {
			console.error(`Expected resource path in theme manifest for format '${format}' but got none.`)
			return
		}

		console.log(`Initiating download for generated theme at path '${resourcePath}'.`)
		downloadResource(resourcePath)
	}

	const onItemClick = async (format: ThemeFormat) => {
		if (props.state.kind === ThemeManifestStateKind.Generated) {
			const manifest = props.state.manifest
			console.log(`Initiating theme download from previously generated collection.`)
			downloadResourceViaManifest(manifest, format)

			return
		}

		if (props.state.kind === ThemeManifestStateKind.None) {
			const generatedManifest = await props.onRequest?.()

			if (!generatedManifest) {
				console.error(`Expected theme manifest to be available on request.`)
				return
			}

			console.log(`Initiating theme download from newly generated collection.`)
			downloadResourceViaManifest(generatedManifest, format)
			return
		}
	}

	const itemProps: ThemeDownloadItemProps[] = generatedThemeFormats.map(format => {
		return {
			name: props.name,
			format: format,
			onClick: () => onItemClick(format)
		}
	})

	return (
		<section className={className(styles.block, props.className)}>
			<h2 className={styles.heading}>Download</h2>
			<div className={styles.introduction}>Generate and download your theme in supported formats:</div>
			<div className={styles.list}>
				<ThemeDownloadList name={"Untitled"} items={itemProps} />
				<a ref={anchorRef} download />
			</div>
			<div className={styles.state}>Manifest state: "{props.state.kind}"</div>
		</section>
	)
}

export default ThemeManifestDownloads
