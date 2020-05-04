import AnimatedCard from 'components/animated/AnimatedCard'
import Subnav from 'components/Subnav'
import React from 'react'

const InnerLayout = ({ children, title, items, padding, ...props }) => (
	<AnimatedCard {...props}>
		<div
			className='uk-align-center uk-padding-small uk-padding-remove-horizontal'
			style={{ maxWidth: 800 }}
		>
			{title && (
				<p className='uk-text-primary text-xlarge uk-text-center uk-text-capitalize'>
					{title}
				</p>
			)}
			{items && <Subnav {...{ items, padding }} padding/>}
			<div className='uk-margin-top'>
				{children}
			</div>
		</div>
	</AnimatedCard>
)

export default InnerLayout
