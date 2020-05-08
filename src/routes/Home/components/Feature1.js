import React from 'react'
import { Feature, Muted } from './'

const Feature1 = () => (
	<Feature title='create challenges' icon='calendar-plus'>
		Choose any desired
		<Muted text=' name'/>,
		<Muted text=' difficulty'/>,
		<Muted text=' duration '/>
		and
		<Muted text=' delay '/>
		for the challenge!
	</Feature>
)

export default Feature1
