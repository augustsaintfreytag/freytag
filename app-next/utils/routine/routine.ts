import { TimeInterval } from "~/utils/date/library/intervals"
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
		throw new Error(`Routine with key '${key}' is already registered.`)
	}

	routines[key] = {
		key,
		interval,
		nextRun: new Date(Date.now() + interval),
		block
	}
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

function initRoutines() {
	if (!isServerSide() || checkRoutineInterval) {
		return
	}

	checkRoutineInterval = setInterval(checkRoutines, 2e3)
}

initRoutines()
