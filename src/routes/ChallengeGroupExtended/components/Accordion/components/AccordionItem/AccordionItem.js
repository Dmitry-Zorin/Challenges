import GroupItem from 'components/GroupItem'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import accordionItem from './AccordionItem.animation'
import AccordionContent from './components/AccordionContent'

const AccordionItem = ({ challenge, group, active, onClick, navigate }) => (
	<li>
		<a href='/#' onClick={e => onClick(e, challenge._id)}>
			<GroupItem {...{ challenge, group, active }} extended/>
		</a>
		<AnimatePresence>
			{!active ? null : (
				<motion.div
					animate='animate'
					exit='initial'
					variants={accordionItem}
				>
					<AccordionContent {...{ challenge, group, navigate }}/>
				</motion.div>
			)}
		</AnimatePresence>
	</li>
)

export default AccordionItem
