import GroupItem from 'components/GroupItem'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import AccordionContent from './components/AccordionContent'

const initial = { height: 0, opacity: 0 }
const animate = { height: 'auto', opacity: 1 }
const exit = initial

const AccordionItem = ({ challenge, group, active, onClick, navigate }) => (
	<li>
		<a href='/#' onClick={e => onClick(e, challenge._id)}>
			<GroupItem {...{ challenge, group, active }} extended/>
		</a>
		<AnimatePresence>
			{!active ? null : (
				<motion.div
					transition={{ duration: 0.2 }}
					{...{ initial, animate, exit }}
				>
					<AccordionContent {...{ challenge, group, navigate }}/>
				</motion.div>
			)}
		</AnimatePresence>
	</li>
)

export default AccordionItem
