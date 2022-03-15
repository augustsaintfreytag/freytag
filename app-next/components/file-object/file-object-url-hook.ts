import { useEffect, useState } from "react"

export function useFileObjectURL<Contents extends Object>(fileName: string, fileType: string, fileContents?: Contents): string | undefined {
	const { createObjectURL, revokeObjectURL } = URL
	const [objectURL, setObjectURL] = useState<string | undefined>(undefined)

	useEffect(() => {
		objectURL && revokeObjectURL(objectURL)

		if (!fileContents) {
			return
		}

		const file = new File([JSON.stringify(fileContents)], fileName, { type: fileType })
		const newObjectURL = createObjectURL(file)

		setObjectURL(newObjectURL)
		console.log(`Generated new file blob url '${newObjectURL}'.`)

		return () => {
			objectURL && revokeObjectURL(objectURL)
		}
	}, [fileContents])
	return objectURL
}
