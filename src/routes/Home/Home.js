import Authorization from 'components/Authorization'
import React from 'react'
import { Features, ScrollDown, Slideshow } from './components'

const Home = (props) => (
	<div className='uk-text-light' style={{ paddingBottom: '10vh' }}>
		<Features/>
		<ScrollDown target='#slideshow'/>
		<Slideshow/>
		<br/>
		<Authorization {...props}/>
		<div className='uk-visible@s' style={{ height: '10vh' }}/>
	</div>
)

export default Home
