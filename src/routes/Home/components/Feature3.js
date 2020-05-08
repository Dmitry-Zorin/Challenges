import React from 'react'
import { Feature, Muted } from './'

const Feature3 = () => (
	<Feature title='update anytime' icon='sync-alt'>
		Choose any desired
		<Muted text=' name'/>,
		<Muted text=' difficulty'/>,
		<Muted text=' duration '/>
		and
		<Muted text=' delay '/>
		for the challenge!
	</Feature>
)

export default Feature3