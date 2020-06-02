import { Card, Subnav } from 'components'
import React from 'react'

const InnerLayout = ({ title, items, children, ...props }) => (
	<Card {...props} large>
		<div className='uk-align-center' style={{ maxWidth: 800 }}>
			{title && (
				<p
					className='uk-text-center uk-text-primary uk-text-capitalize uk-text-bold'
					style={{ fontSize: '2.25em' }}
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
