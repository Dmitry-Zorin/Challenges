import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Button = ({ icon, value, submit, type = 'default', className = '', ...props }) => (
	<button
		type={submit ? 'submit' : 'button'}
		className={`uk-button uk-button-${type} uk-width-1-1 ${className}`}
		{...props}
	>
		<p>
			{icon && (
				<FontAwesomeIcon className={value ? '' : 'icon-center'} {...{ icon }}/>
			)}
			{value}
		</p>
	</button>
)

export default Button
