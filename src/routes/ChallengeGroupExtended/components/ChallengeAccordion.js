import React, { useEffect } from 'react'
import { Accordion, AccordionItem, Grid } from 'uikit-react'
import { Buttons } from './Buttons'
import { itemsPerPage } from 'data/settings.json'
import { GroupItem } from 'components/ChallengeGroupItem'

const options = {
	ongoing: ['complete'],
	upcoming: ['start', 'complete'],
	completed: [],
}

const labelTypes = {
	Easy: 'success',
	Medium: 'warning',
	Hard: 'danger',
}

export const ChallengeAccordion = ({ challenges, page, group, navigate }) => {
	useEffect(() => {
		// Fix for mount stutter
		for (const content of document.querySelectorAll('.uk-accordion-content')) {
			content.style.display = 'block'
		}
	}, [])
	
	return (
		<Accordion>
			{challenges.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
				.map(c => (
					<AccordionItem
						key={c._id}
						className='uk-margin-remove'
						title={<GroupItem group={group} challenge={c} extended/>}
						content={
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
										options={options[group]}
									/>
								</Grid>
								<hr className='uk-margin-remove-bottom'/>
							</div>
						}
					/>
				))
			}
		</Accordion>
	)
}
