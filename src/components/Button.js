import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HStack } from 'components'

const Button = ({
	icon,
	value,
	submit,
	type = 'default',
	className = '',
	...props
}) => (
	<button
		type={submit ? 'submit' : 'button'}
		className={`uk-button uk-button-${type} uk-width-1-1 ${className}`}
		{...props}
	>
		<HStack className="uk-flex-center">
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className={value ? undefined : 'icon-center'}
				/>
			)}
			{value && <p>{value}</p>}
		</HStack>
	</button>
)

export default Button
