export class Color {
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

	static randomComponent(): number {
		return Math.round(Math.random() * 1000) / 1000
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
}
