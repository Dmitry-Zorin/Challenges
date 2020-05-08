import Authorization from 'components/Authorization'
import React from 'react'
import { Features, ScrollDown, Slideshow } from './components'
import { registration } from './Home.module.scss'

const Home = (props) => (
	<div className='uk-text-light'>
		<Features/>
		<ScrollDown target='#slideshow'/>
		<Slideshow/>
		<div className={registration}>
			<Authorization {...props}/>
		</div>
	</div>
)

export default Home
