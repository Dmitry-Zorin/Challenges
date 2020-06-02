import GroupItem from 'components/GroupItem'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import AccordionContent from './components/AccordionContent'

const AccordionItem = ({ challenge, group, active, onClick }) => (
	<motion.li
		key={challenge._id}
		variants={{
			initial: { opacity: 0, height: 0 },
			animate: { opacity: 1, height: 'auto' },
		}}
		transition={{ ease: 'easeOut' }}
	>
		<a
			href='/#'
			onMouseDown={() => onClick(challenge._id)}
			onClick={e => e.preventDefault()}
		>
			<GroupItem {...{ challenge, group, active }} extended/>
		</a>
		<AnimatePresence>
			{!active ? null : (
				<AccordionContent {...{ challenge, group }}/>
			)}
		</AnimatePresence>
	</motion.li>
)

export default AccordionItem
