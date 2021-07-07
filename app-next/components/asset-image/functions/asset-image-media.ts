// Values

const tabletBreakpoint = 1024
const phoneBreakpoint = 696

export const phoneMediaQuery = `(min-width: 0px) and (max-width: ${phoneBreakpoint}px)`
export const tabletMediaQuery = `(min-width: ${phoneBreakpoint + 1}px) and (max-width: ${tabletBreakpoint}px)`
export const desktopMediaQuery = `(min-width: ${tabletBreakpoint + 1}px)`
