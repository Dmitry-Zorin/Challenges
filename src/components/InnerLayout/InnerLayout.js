import AnimatedCard from 'components/animated/AnimatedCard'
import DataContext from 'contexts/DataContext'
import React, { useContext, useEffect } from 'react'
import { Margin } from 'uikit-react'
import Navbar from './components/Navbar'
import { card } from './InnerLayout.module.scss'

const InnerLayout = ({ children, title, left, right, ...props }) => {
	const { setTitle } = useContext(DataContext)
	
	useEffect(() => setTitle(title), [title, setTitle])
	
	return (
		<AnimatedCard
			className={[card, left && 'uk-padding-remove-top'].join(' ')}
			{...props}
		>
			<Margin
				type={`${left ? 'remove-' : ''}top; bottom`}
				className='uk-align-center'
				style={{ maxWidth: '800px' }}
			>
				<Navbar {...{ left, right }}/>
				<Margin type='remove'>
					{children}
				</Margin>
			</Margin>
		</AnimatedCard>
	)
}

export default InnerLayout
