import SwitcherItem from 'components/SwitcherItem'
import React from 'react'

const AuthSubnav = ({ authOption, authOptions, setAuthOption }) => (
	<ul className='uk-subnav uk-subnav-pill uk-flex-center uk-child-width-1-2 uk-child-width-1-3@m'>
		{Object.values(authOptions).map(o => (
			<SwitcherItem
				key={o.action}
				icon={o.icon}
				value={o.title}
				active={o.action === authOption.action}
				onClick={() => setAuthOption(o)}
			/>
		))}
	</ul>
)

export default AuthSubnav
