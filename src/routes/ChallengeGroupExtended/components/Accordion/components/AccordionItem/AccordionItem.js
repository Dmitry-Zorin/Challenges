import GroupItem from 'components/GroupItem'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import AccordionContent from './components/AccordionContent'

const AccordionItem = ({ challenge, group, active, onClick, navigate }) => (
	<motion.li
		variants={{
			initial: { opacity: 0, height: 0 },
			animate: { opacity: 1, height: 'auto' },
		}}
		transition={{ ease: 'easeOut', duration: 0.5 }}
	>
		<a href='/#' onClick={e => onClick(e, challenge._id)}>
			<GroupItem {...{ challenge, group, active }} extended/>
		</a>
		<AnimatePresence>
			{!active ? null : (
				<AccordionContent {...{ challenge, group, navigate }}/>
			)}
		</AnimatePresence>
	</motion.li>
)

export default AccordionItem
