import React, { useEffect } from 'react'
import { Accordion, AccordionItem, Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getChallengeTime } from 'scripts/time'
import { Buttons } from './Buttons'
import { infinity, itemsPerPage } from 'data/settings.json'

const challengeInfo = {
	ongoing: { icon: 'arrow-down', options: ['complete'] },
	upcoming: { icon: 'arrow-up', options: ['start', 'complete'] },
	completed: { icon: 'check' },
}

const labelTypes = {
	Easy: 'success',
	Medium: 'warning',
	Hard: 'danger',
}

export const ChallengeAccordion = ({ challenges, page, group, navigate }) => {
	let time
	
	useEffect(() => {
		// Fix for mount stutter
		for (const content of document.querySelectorAll('.uk-accordion-content')) {
			content.style.display = 'block'
		}
	})
	
	return (
		<Accordion>
			{challenges.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
				.map(c => (
					<AccordionItem key={c._id} className='uk-margin-remove' title={
						<Grid>
							<p className='uk-width-expand'>{c.name}</p>
							<div
								className='uk-text-meta uk-padding-remove uk-text-right'
								style={{ marginTop: '0.35em' }}
							>
								<FontAwesomeIcon
									icon={
										(time = getChallengeTime(c)) && time !== infinity
										|| group === 'completed' ? challengeInfo[group].icon
											: time === infinity ? 'infinity' : 'exclamation'
									}
									transform='shrink-3'
								/>
								{time !== infinity && time}
							</div>
						</Grid>
					} content={
						<div>
							<Grid className='uk-margin-remove'>
								<div
									className={'uk-label uk-label-' + labelTypes[c.difficulty]}
									style={{ height: '1.5em', marginTop: '0.6em' }}
								>
									{c.difficulty}
								</div>
								<Buttons
									challenge={c}
									navigate={navigate}
									options={challengeInfo[group].options}
								/>
							</Grid>
							<hr className='uk-margin-remove-bottom'/>
						</div>
					}/>
				))}
		</Accordion>
	)
}
