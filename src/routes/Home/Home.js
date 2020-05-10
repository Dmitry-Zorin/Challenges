import Authorization from 'components/Authorization'
import React from 'react'
import { Features, ScrollDown, Slideshow } from './components'
import { registration } from './Home.module.scss'

const slideshowId = 'slideshow'

const Home = (props) => (
	<div className='uk-text-light'>
		<Features/>
		<ScrollDown target={slideshowId}/>
		<Slideshow id={slideshowId}/>
		<div className={registration}>
			<Authorization {...props}/>
		</div>
	</div>
)

export default Home
