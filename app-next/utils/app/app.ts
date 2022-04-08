export const appEnvironmentIsProduction = () => process.env.NODE_ENV === "production"
export const appEnvironmentIsDevelopment = () => appEnvironmentIsProduction() !== true

export const appLocale = () => process.env.NEXT_PUBLIC_APP_LOCALE
export const internalAppPath = () => process.env.NEXT_PUBLIC_APP_PATH_INTERNAL
export const publicAppPath = () => process.env.NEXT_PUBLIC_APP_PATH_PUBLIC
export const internalAppDataPath = () => process.env.NEXT_PUBLIC_CONTENT_PATH_INTERNAL

export const internalCockpitPath = () => process.env.NEXT_PUBLIC_COCKPIT_PATH_INTERNAL
export const publicCockpitPath = () => process.env.NEXT_PUBLIC_COCKPIT_PATH_PUBLIC
export const cockpitToken = () => process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN

export const publicDropshipPath = () => process.env.NEXT_PUBLIC_DROPSHIP_PATH

export const colorThemeAssemblyVersion = () => process.env.NEXT_PUBLIC_COLOR_THEME_ASSEMBLY_VERSION

export const xccUser = () => process.env.NEXT_PUBLIC_XCC_USER
export const xccPassword = () => process.env.NEXT_PUBLIC_XCC_PASSWORD
export const xccColorThemeUtilityHost = () => process.env.NEXT_PUBLIC_XCC_COLOR_THEME_UTILITY_HOST
export const xccColorThemeOutputPath = () => process.env.NEXT_PUBLIC_XCC_COLOR_THEME_OUTPUT_PATH
