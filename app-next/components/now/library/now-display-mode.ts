export enum NowDisplayMode {
	Now,
	Year,
	NextHour,
	Today,
	Date,
	DateLocalized
}

export const nowDisplayModeCases = [
	NowDisplayMode.Now,
	NowDisplayMode.Today,
	NowDisplayMode.NextHour,
	NowDisplayMode.DateLocalized,
	NowDisplayMode.Date,
	NowDisplayMode.Year
]
