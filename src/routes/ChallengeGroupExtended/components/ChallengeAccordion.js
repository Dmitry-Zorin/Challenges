import { GroupItem } from 'components/GroupItem'
import { itemsPerPage } from 'data/settings.json'
import React, { useEffect } from 'react'
import { Accordion, AccordionItem, Flex } from 'uikit-react'
import { Buttons } from './Buttons'

const options = {
	ongoing: ['complete'],
	upcoming: ['start', 'complete'],
	completed: [],
}

const labelTypes = {
	easy: 'success',
	medium: 'warning',
	hard: 'danger',
}

export const ChallengeAccordion = ({ challenges, page, group, navigate }) => {
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
					<AccordionItem
						key={c._id}
						className='uk-margin-remove'
						title={
							<GroupItem challenge={c} {...{ group }} extended/>
						}
						content={
							<div>
								<Flex>
									<div className={`uk-label uk-label-${labelTypes[c.difficulty.toLowerCase()]}`}>
										{c.difficulty}
									</div>
									<Buttons
										challenge={c}
										options={options[group]}
										{...{ navigate }}
									/>
								</Flex>
								<hr className='uk-margin-remove-bottom'/>
							</div>
						}
					/>
				))
			}
		</Accordion>
	)
}
