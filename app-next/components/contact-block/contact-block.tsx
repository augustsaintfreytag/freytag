import { FunctionComponent, useMemo } from "react"
import { PropsWithClassName } from "~/types/props"
import * as Rot13 from "~/utils/address-obfuscator/functions/rot-13"

function encoded(lines: string[]): string[] {
	return lines.map(contactLine => Rot13.encoded(contactLine))
}

const contactLines: string[] = ["August Saint Freytag", "Friesenstraße 15C", "10965 Berlin"]
const addressLines: string[] = ["Telephone: 030 915 779 70‬", "Mail: me@augustfreytag.com", "Internet address: augustfreytag.com"]

const Lines: FunctionComponent<{ lines: string[] }> = props => (
	<div>
		{props.lines.map(line => (
			<>
				{line}
				<br />
			</>
		))}
	</div>
)

type Props = PropsWithClassName & {
	decoded?: boolean
}

const ContactBlock: FunctionComponent<Props> = props => {
	const isDecoded = props.decoded ?? false
	const codedContactLines = useMemo<string[]>(() => {
		if (isDecoded) {
			return contactLines
		}

		return encoded(contactLines)
	}, [props.decoded])

	const codedAddressLines = useMemo<string[]>(() => {
		if (isDecoded) {
			return addressLines
		}

		return encoded(addressLines)
	}, [props.decoded])

	return (
		<div className={props.className}>
			<Lines lines={codedContactLines} />
			<Lines lines={codedAddressLines} />
		</div>
	)
}

export default ContactBlock
