export function appEnvironmentIsProduction(): boolean {
	return process.env.NODE_ENV === "production"
}

export function appEnvironmentIsDevelopment(): boolean {
	return process.env.NODE_ENV !== "production"
}

export function appProtocol(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_PROTOCOL
}

export function appHost(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_HOST_CLIENT
}

export function appLocale(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_LOCALE
}

export function cockpitToken(): string | undefined {
	return process.env.NEXT_PUBLIC_COCKPIT_ACCESS_TOKEN
}

export function cockpitProtocol(): string | undefined {
	return process.env.NEXT_PUBLIC_COCKPIT_PROTOCOL
}

export function cockpitHostClient(): string | undefined {
	return process.env.NEXT_PUBLIC_COCKPIT_HOST_CLIENT
}

export function cockpitHostServer(): string | undefined {
	return process.env.NEXT_PUBLIC_COCKPIT_HOST_SERVER
}

export function dropshipHostClient(): string | undefined {
	return process.env.NEXT_PUBLIC_DROPSHIP_HOST_CLIENT
}
