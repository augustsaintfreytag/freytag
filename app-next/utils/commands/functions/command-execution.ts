import { exec } from "child_process"
import { crossContainerCommunicationPassword, crossContainerCommunicationUser } from "~/utils/app/app"

export async function executeLocalCommands(commands: string[]): Promise<string> {
	return executeLocalCommand(joinedCommands(commands))
}

export async function executeLocalCommand(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error || stderr) {
				reject(error ?? stderr)
				return
			}

			resolve(stdout)
		})
	})
}

export async function executeRemoteCommands(host: string, commands: string[]): Promise<string> {
	return executeRemoteCommand(host, joinedCommands(commands))
}

export async function executeRemoteCommand(host: string, command: string): Promise<string> {
	const [user, password] = [crossContainerCommunicationUser(), crossContainerCommunicationPassword()]

	if (!user || !password) {
		throw new Error("Can not execute command without cross-container credentials (XCC params in environment).")
	}

	const wrappedCommand = `sshpass -p ${password} ssh -o LogLevel=ERROR -o StrictHostKeyChecking=no ${user}@${host} '${command}'`
	return executeLocalCommand(wrappedCommand)
}

export function joinedCommands(commands: string[]): string {
	return commands.join(" && ")
}
