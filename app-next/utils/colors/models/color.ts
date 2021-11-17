export class Color {
	red: number
	green: number
	blue: number

	constructor(red: number, green: number, blue: number) {
		this.red = red
		this.green = green
		this.blue = blue
	}

	get key(): string {
		return `${this.red},${this.green},${this.blue}`
	}

	get rgb(): string {
		const [red, green, blue] = [this.red * 255, this.green * 255, this.blue * 255]
		return `rgb(${red}, ${green}, ${blue})`
	}
}
