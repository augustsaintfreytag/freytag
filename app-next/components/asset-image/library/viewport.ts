export enum Viewport {
	Desktop,
	Tablet,
	Phone
}

export interface ViewportValues<Value> {
	desktop: Value
	tablet: Value
	phone: Value
}
