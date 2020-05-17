import { motion } from 'framer-motion'
import React from 'react'
import accordionContent from './AccordionContent.animation'
import OptionButton from './components/OptionButton'

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

const AccordionContent = ({ group, challenge, navigate }) => {
	const { difficulty } = challenge
	const labelType = labelTypes[difficulty.toLowerCase()]
	
	return (
		<motion.div animate='animate' exit='initial' variants={accordionContent}>
			<div data-uk-grid>
				<div className='uk-flex uk-flex-middle'>
					<div className={`uk-label uk-label-${labelType}`}>
						{difficulty}
					</div>
				</div>
				<div className='uk-width-expand uk-flex uk-flex-right'>
					{[...options[group], 'edit', 'delete'].map(o => (
						<OptionButton key={o} option={o} {...{ challenge, navigate }}/>
					))}
				</div>
			</div>
			<div className='padding uk-padding-remove-bottom'>
				<hr className='uk-margin-remove'/>
			</div>
		</motion.div>
	)
}

export default AccordionContent
