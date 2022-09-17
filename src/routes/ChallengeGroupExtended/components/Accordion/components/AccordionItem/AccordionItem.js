import GroupItem from 'components/GroupItem'
import { AnimatePresence, motion } from 'framer-motion'
import AccordionContent from './components/AccordionContent'
import accordionContent from './components/AccordionContent/AccordionContent.animation'

const AccordionItem = ({ challenge, group, active, onClick }) => (
	<motion.li key={challenge._id} variants={accordionContent}>
		<a
			href="/#"
			onMouseDown={() => onClick(challenge._id)}
			onClick={(e) => e.preventDefault()}
		>
			<GroupItem {...{ challenge, group, active }} extended />
		</a>
		<AnimatePresence>
			{!active ? null : <AccordionContent {...{ challenge, group }} />}
		</AnimatePresence>
	</motion.li>
)

export default AccordionItem
