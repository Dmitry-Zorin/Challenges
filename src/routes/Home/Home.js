import React from 'react'
import { Features, Registration, ScrollDown, Slideshow } from './components'

const Home = (props) => (
	<div className='uk-text-light' style={{ paddingBottom: '10vh' }}>
		<Features/>
		<ScrollDown target='#slideshow'/>
		<Slideshow/>
		<br/>
		<Registration {...props}/>
		<div className='uk-visible@s' style={{ height: '10vh' }}/>
	</div>
)

export default Home
