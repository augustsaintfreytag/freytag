import { FunctionComponent, useEffect } from "react"
import { useInputState } from "~/components/input/input-state/functions/input-state-hook"
import { usePageEvent } from "~/components/page-event/functions/page-event-hook"
import { useAutoResettingState } from "~/components/state/functions/auto-resetting-state-hook"
import { className } from "~/utils/class-names/class-name"
import InputEnclosure from "../input-enclosure/input-enclosure"
import { Props as RawProps } from "../input-text-field/input-text-field"
import styles from "./input-text-area.module.sass"

type Props = RawProps

const InputTextArea: FunctionComponent<Props> = props => {
	const { inputRef, inputIsValid, onInputChange, inputContext, setInputIsUsed } = useInputState<HTMLTextAreaElement>(props.setValue)
	const [isHighlighting, setIsHighlighting] = useAutoResettingState(false)

	useEffect(() => {
		if (!inputIsValid) {
			setIsHighlighting(true)
		}
	}, [inputIsValid])

	usePageEvent("validateInputs", () => {
		setInputIsUsed(true)
		setIsHighlighting(true)
	})

	const inputClassName = className(
		styles.block,
		props.readOnly && styles.isReadOnly,
		isHighlighting && styles.isHighlighting,
		inputIsValid && styles.isValid,
		props.className
	)

	return (
		<InputEnclosure className={inputClassName} name={props.name} context={inputContext}>
			<textarea
				ref={inputRef}
				id={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={onInputChange}
				required={props.required}
				minLength={props.minLength}
				maxLength={props.maxLength}
				readOnly={props.readOnly}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
			/>
		</InputEnclosure>
	)
}

export default InputTextArea
