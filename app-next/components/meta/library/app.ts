export function appProtocol(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_PROTOCOL
}

export function appHost(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_HOST_CLIENT
}

export function appLocale(): string | undefined {
	return process.env.NEXT_PUBLIC_APP_LOCALE
}
