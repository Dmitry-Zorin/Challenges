import { HStack } from 'components'
import { motion } from 'framer-motion'

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

const AccordionContent = ({ group, challenge }) => {
	const { difficulty } = challenge
	const labelType = labelTypes[difficulty.toLowerCase()]

	return (
		<motion.div
			variants={accordionContent}
			initial="initial"
			animate="animate"
			exit="initial"
		>
			<HStack>
				<div className={`uk-label uk-label-${labelType}`}>{difficulty}</div>
				<div className="uk-width-expand uk-flex uk-flex-right">
					{[...options[group], 'edit', 'delete'].map((o) => (
						<OptionButton key={o} option={o} challenge={challenge} />
					))}
				</div>
			</HStack>
			<div className="padding uk-padding-remove-bottom">
				<hr className="uk-margin-remove" />
			</div>
		</motion.div>
	)
}

export default AccordionContent
