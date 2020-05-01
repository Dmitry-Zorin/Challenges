import AnimatedCard from 'components/animated/AnimatedCard'
import Subnav from 'components/Subnav'
import React from 'react'

const InnerLayout = ({ children, title, items, ...props }) => (
	<AnimatedCard className='uk-padding' {...props}>
		<div className='uk-align-center' style={{ maxWidth: 800 }}>
			{title && !items && (
				<p className='uk-text-primary text-xlarge uk-text-center uk-text-capitalize'>
					{title}
				</p>
			)}
			{items && <Subnav {...{ items }}/>}
			{children}
		</div>
	</AnimatedCard>
)

export default InnerLayout
