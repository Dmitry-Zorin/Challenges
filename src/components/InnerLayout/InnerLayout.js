import AnimatedCard from 'components/animated/AnimatedCard'
import Subnav from 'components/Subnav'
import DataContext from 'contexts/DataContext'
import React, { useContext, useEffect } from 'react'

const InnerLayout = ({ children, title, items, ...props }) => {
	const { setTitle } = useContext(DataContext)
	
	useEffect(() => setTitle(title), [title, setTitle])
	
	return (
		<AnimatedCard {...props}>
			<div className='uk-align-center' style={{ maxWidth: 800 }}>
				{items && <Subnav {...{ items }}/>}
				{children}
			</div>
		</AnimatedCard>
	)
}

export default InnerLayout
