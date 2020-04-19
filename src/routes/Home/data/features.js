import { create, monitor, update } from 'routes/Home/images'
import React from 'react'

const features = [
	{
		src: create,
		icon: 'calendar-plus',
		title: 'create challenges',
		component: () => (
			<>
				Choose any desired
				<Muted text=' name'/>,
				<Muted text=' difficulty'/>,
				<Muted text=' duration '/>
				and
				<Muted text=' delay '/>
				for the challenge!
			</>
		),
	},
	{
		src: monitor,
		icon: 'tachometer-alt',
		title: 'monitor progress',
		component: () => (
			<>
				Keep track of all the
				<Muted text=' ongoing'/>,
				<Muted text=' upcoming '/>
				and
				<Muted text=' completed '/>
				challenges!
			</>
		),
	},
	{
		src: update,
		icon: 'sync-alt',
		title: 'update anytime',
		component: () => (
			<>
				Choose any desired
				<Muted text=' name'/>,
				<Muted text=' difficulty'/>,
				<Muted text=' duration '/>
				and
				<Muted text=' delay '/>
				for the challenge!
			</>
		),
	},
]

const Muted = ({ text }) => (
	<span className='uk-text-muted'>{text}</span>
)

export default features
