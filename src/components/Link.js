import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as RouterLink } from 'react-router-dom'
import HStack from './HStack'

const Link = ({
	to,
	text = undefined,
	icon = undefined,
	right = false,
	...props
}) => (
	<RouterLink to={to} {...props}>
		<HStack>
			{right && <p>{text}</p>}
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className={`icon-${right ? 'right' : 'left'}`}
				/>
			)}
			{!right && <p>{text}</p>}
		</HStack>
	</RouterLink>
)

export default Link
