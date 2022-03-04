import { TimeInterval, TimeIntervalValue } from "~/utils/date/library/intervals"
import { isServerSide } from "~/utils/render/initial-render-hook"
import { Dictionary } from "~/utils/types/library/dictionary"

// Library

type RoutineKey = string

interface Routine {
	key: RoutineKey
	interval: number
	lastRun?: Date
	nextRun: Date
	block: () => void
}

// State

let checkRoutineInterval: any

const routines: Dictionary<RoutineKey, Routine> = {}

// Management

export function registerRoutine(key: RoutineKey, interval: TimeInterval, block: () => void) {
	if (routines[key]) {
		console.log(`Routine ${key} already registered, overwriting previous routine. Consider using 'registerRoutineIfNotExists' for this entry.`)
	}

	routines[key] = {
		key,
		interval,
		nextRun: new Date(Date.now() + interval),
		block
	}

	console.log(`Registered new routine '${key}' with desired interval ${formattedRoutineTimeInterval(interval)}.`)
}

export function registerRoutineIfNotExists(key: RoutineKey, interval: TimeInterval, block: () => void) {
	if (routines[key]) {
		return
	}

	registerRoutine(key, interval, block)
}

function runRoutineImmediately(key: RoutineKey) {
	const routine = routines[key]!
	const now = new Date()

	routine.block()
	routine.lastRun = new Date()
	routine.nextRun = new Date(now.getTime() + routine.interval)
}

function checkRoutines() {
	const now = new Date()
	const dueKeys = new Set<RoutineKey>()

	for (const key in routines) {
		const routine = routines[key]!

		if (now.getTime() >= routine.nextRun.getTime()) {
			dueKeys.add(key)
		}
	}

	for (const key of dueKeys) {
		runRoutineImmediately(key)
	}

	if (dueKeys.size) {
		console.log(`Ran routines for ${dueKeys.size} entries.`)
	}
}

// Formatting

function formattedRoutineTimeInterval(interval: TimeInterval): string {
	const value = Math.ceil(interval / TimeIntervalValue.Minute)
	return `${value} minutes`
}

// Init

function initRoutines() {
	if (!isServerSide() || checkRoutineInterval) {
		return
	}

	checkRoutineInterval = setInterval(checkRoutines, TimeIntervalValue.Minute)
}

initRoutines()
