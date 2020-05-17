import { Card, Subnav } from 'components'
import React from 'react'

const InnerLayout = ({ title, items, children, ...props }) => (
	<Card {...props} large>
		<div className='uk-align-center' style={{ maxWidth: 800 }}>
			{title && (
				<p
					className='uk-text-center uk-text-primary uk-text-bold uk-text-capitalize'
					style={{ fontSize: '2.2em' }}
				>
					{title}
				</p>
			)}
			{items && <Subnav {...{ items }}/>}
			{children}
		</div>
	</Card>
)

export default InnerLayout
