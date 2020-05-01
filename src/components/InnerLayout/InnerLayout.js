import AnimatedCard from 'components/animated/AnimatedCard'
import Subnav from 'components/Subnav'
import React from 'react'

const InnerLayout = ({ children, title, items, padding, ...props }) => (
	<AnimatedCard className='uk-padding-remove-vertical' {...props}>
		<div
			className='uk-align-center uk-padding uk-padding-remove-horizontal'
			style={{ maxWidth: 800 }}
		>
			{title && !items && (
				<p className='uk-text-primary text-xlarge uk-text-center uk-text-capitalize'>
					{title}
				</p>
			)}
			{items && <Subnav {...{ items, padding }}/>}
			{children}
		</div>
	</AnimatedCard>
)

export default InnerLayout
