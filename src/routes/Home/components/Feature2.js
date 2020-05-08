import React from 'react'
import { Feature, Muted } from './'

const Feature2 = () => (
	<Feature title='monitor progress' icon='tachometer-alt'>
		Keep track of all the
		<Muted text=' ongoing'/>,
		<Muted text=' upcoming '/>
		and
		<Muted text=' completed '/>
		challenges!
	</Feature>
)

export default Feature2