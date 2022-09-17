import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import HStack from './HStack'

const TextInput = ({
	type = 'text',
	icon,
	label,
	value = '',
	defaultValue = label,
	setState,
	capital,
}) => (
	<div className="padding-text-top">
		<HStack
			className="uk-text-primary"
			style={{
				marginLeft: '0.5rem',
				marginBottom: '0.25rem',
			}}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
			<p>{upperFirst(label)}</p>
		</HStack>
		<input
			className="uk-input"
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			maxLength={250}
			{...{ type, value }}
		/>
	</div>
)

export default TextInput
