export function formattedDate(date: Date): string {
	return `${formattedMonth(date.getMonth() + 1)}/${date.getFullYear()}`
}

function formattedMonth(month: number): string {
	return month < 10 ? "0" + month : String(month)
}