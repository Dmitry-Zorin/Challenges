import AnimatedButton from 'components/animated/AnimatedButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const Subnav = ({ items, ...props }) => (
	<ButtonGroup {...props}>
		{items.map(({ icon, value, active, type = 'primary', ...props }) => (
			<div key={value} className='uk-margin-remove uk-width-1-3@m'>
				<AnimatedButton
					className={[
						'switcher',
						'uk-width-1-1',
						`uk-button-${active ? type : 'default'}`,
					].join(' ')}
					{...{ icon, value, ...props }}
				/>
			</div>
		))}
	</ButtonGroup>
)

export default Subnav
