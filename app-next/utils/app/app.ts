export const appEnvironmentIsProduction = () => process.env.NODE_ENV === "production"

export const appEnvironmentIsDevelopment = () => process.env.NODE_ENV !== "production"

export const appProtocol = () => process.env.NEXT_PUBLIC_APP_PROTOCOL

export const appHost = () => process.env.NEXT_PUBLIC_APP_HOST_CLIENT

export const appLocale = () => process.env.NEXT_PUBLIC_APP_LOCALE

export const appDataHost = () => process.env.NEXT_PUBLIC_APP_DATA_HOST

export const cockpitToken = () => process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN

export const cockpitProtocol = () => process.env.NEXT_PUBLIC_COCKPIT_PROTOCOL

export const cockpitHostClient = () => process.env.NEXT_PUBLIC_COCKPIT_HOST_CLIENT

export const cockpitHostServer = () => process.env.NEXT_PUBLIC_COCKPIT_HOST_SERVER

export const dropshipHostClient = () => process.env.NEXT_PUBLIC_DROPSHIP_HOST_CLIENT

export const xccUser = () => process.env.NEXT_PUBLIC_XCC_USER

export const xccPassword = () => process.env.NEXT_PUBLIC_XCC_PASSWORD

export const xccColorThemeUtilityHost = () => process.env.NEXT_PUBLIC_XCC_COLOR_THEME_UTILITY_HOST

export const xccColorThemeOutputPath = () => process.env.NEXT_PUBLIC_XCC_COLOR_THEME_OUTPUT_PATH
