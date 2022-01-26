export interface ColorValue {
	red: number
	green: number
	blue: number
}

export function isColorValue(value: any): value is ColorValue {
	return value && typeof value === "object" && value.red && value.green && value.blue
}

export class Color implements ColorValue {
	red: number
	green: number
	blue: number

	// Defaults

	static get white(): Color {
		return new Color(1, 1, 1)
	}

	static get black(): Color {
		return new Color(0, 0, 0)
	}

	static get placeholder(): Color {
		return new Color(0.96, 0.96, 0.96)
	}

	static get random(): Color {
		return new Color(this.randomComponent(), this.randomComponent(), this.randomComponent())
	}

	private static randomComponent(): number {
		return Math.round(Math.random() * 1000) / 1000
	}

	static get randomAesthetic(): Color {
		return new Color(this.randomAestheticComponent(), this.randomAestheticComponent(), this.randomAestheticComponent())
	}

	private static randomAestheticComponent(): number {
		return Math.round(500 + Math.random() * 500) / 1000
	}

	// Init

	constructor(red: number, green: number, blue: number) {
		this.red = Color.limit(red)
		this.green = Color.limit(green)
		this.blue = Color.limit(blue)
	}

	static limit(value: number): number {
		return Math.min(Math.max(value, 0), 1)
	}

	static fromValue(value: ColorValue): Color {
		return new Color(value.red, value.green, value.blue)
	}

	// Value

	get key(): string {
		return `${this.red},${this.green},${this.blue}`
	}

	get rgb(): string {
		const [red, green, blue] = [Color.rgbComponent(this.red), Color.rgbComponent(this.green), Color.rgbComponent(this.blue)]
		return `rgb(${red}, ${green}, ${blue})`
	}

	get hex(): string {
		const [red, green, blue] = [Color.hexComponent(this.red), Color.hexComponent(this.green), Color.hexComponent(this.blue)]
		return `#${red}${green}${blue}`
	}

	static rgbComponent(value: number): number {
		return Math.round(value * 255)
	}

	static hexComponent(value: number): string {
		const boundedValue = Math.round(value * 255)
		const formattedValue = boundedValue.toString(16).padStart(2, "0").toUpperCase()

		return formattedValue
	}

	// Analysis

	get luma(): number {
		return 0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue
	}

	get isDark(): boolean {
		return this.luma < 0.75
	}

	get isLight(): boolean {
		return !this.isDark
	}
}
