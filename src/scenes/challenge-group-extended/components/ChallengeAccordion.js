import React from 'react'
import styles from './ChallengeAccordion.module.scss'
import { Accordion, AccordionItem, Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getChallengeTime } from '../../../services/helper'
import { Buttons } from './Buttons'
import {
	faArrowDown,
	faArrowUp,
	faCheck,
} from '@fortawesome/free-solid-svg-icons'

const challengeInfo = {
	ongoing: {
		options: ['complete', 'delete'],
		icon: faArrowDown,
	},
	upcoming: {
		options: ['start', 'delete'],
		icon: faArrowUp,
	},
	completed: {
		options: ['delete'],
		icon: faCheck,
	},
}

const labelClasses = {
	'Easy': 'uk-label-success',
	'Medium': 'uk-label-warning',
	'Hard': 'uk-label-danger',
}

export const ChallengeAccordion = ({ challenges, page, groupName, navigate }) => (
	<Accordion>
		{challenges.slice(page * 10, (page + 1) * 10).map(c => (
			<AccordionItem
				key={c._id}
				className='uk-margin-remove'
				title={
					<Grid>
						<p className='uk-width-expand'>{c.name}</p>
						<div className={
							styles.marginTop +
							' uk-text-meta uk-padding-remove uk-text-right'
						}>
							<FontAwesomeIcon
								icon={challengeInfo[groupName].icon}
								transform='shrink-2'
							/>
							{getChallengeTime(c)}
						</div>
					</Grid>
				}
				content={
					<div>
						<Grid className='uk-margin-remove'>
							<div className={
								styles.label +
								' uk-label ' +
								labelClasses[c.difficulty]
							}>
								{c.difficulty}
							</div>
							<Buttons
								challenge={c}
								navigate={navigate}
								options={challengeInfo[groupName].options}
							/>
						</Grid>
						<hr/>
					</div>
				}
			/>
		))}
	</Accordion>
)
