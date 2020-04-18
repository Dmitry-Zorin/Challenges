import React from 'react'
import { Features, Registration, ScrollDown, Slideshow } from './components'

const Home = (props) => (
	<div style={{ paddingBottom: '10vh' }}>
		<Features/>
		<ScrollDown target='slideshow'/>
		<Slideshow/>
		<ScrollDown target='registration'/>
		<Registration {...props}/>
		<div className='uk-visible@s' style={{ height: '10vh' }}/>
	</div>
)

export default Home
