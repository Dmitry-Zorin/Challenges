import React from 'react'
import { Card, Flex } from 'uikit-react'
import { Column, Divider } from './components'
import { card } from './Features.module.scss'

const Features = () => (
	<Card className={card}>
		<Flex className='uk-height-1-1'>
			<Flex className='uk-text-center uk-flex-wrap uk-flex-wrap-stretch'>
				<Column title='create challenges' icon='calendar-plus'>
					Choose any desired
					<Muted text=' name'/>,
					<Muted text=' difficulty'/>,
					<Muted text=' duration '/>
					and
					<Muted text=' delay '/>
					for the challenge!
				</Column>
				<Divider/>
				<Column title='monitor progress' icon='tachometer-alt'>
					Keep track of all the
					<Muted text=' ongoing'/>,
					<Muted text=' upcoming '/>
					and
					<Muted text=' completed '/>
					challenges!
				</Column>
				<Divider/>
				<Column title='update anytime' icon='sync-alt'>
					<Muted text=' Start'/>,
					<Muted text=' complete'/>,
					<Muted text=' edit '/>
					or
					<Muted text=' delete '/>
					challenges at any time!
				</Column>
			</Flex>
		</Flex>
	</Card>
)

const Muted = ({ text }) => (
	<span className='uk-text-muted'>{text}</span>
)

export default Features
