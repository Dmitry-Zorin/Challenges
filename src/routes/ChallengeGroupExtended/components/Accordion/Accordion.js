import GroupItem from 'components/GroupItem'
import { itemsPerPage } from 'data/settings.json'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import AccordionContent from './components/AccordionContent'

const Accordion = ({ challenges, page, group, navigate }) => {
	const [openItem, setOpenItem] = useState()
	
	const onClick = useCallback((e, id) => {
		e.preventDefault()
		setOpenItem(openItem !== id && id)
	}, [openItem])
	
	return (
		<motion.ul
			className='uk-list'
			variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
		>
			{challenges.slice((page - 1) * itemsPerPage, page * itemsPerPage)
				.map(c => (
					<li key={c._id}>
						<a href='/#' onClick={e => onClick(e, c._id)}>
							<GroupItem challenge={c} {...{ group }} extended/>
						</a>
						<AnimatePresence initial={false}>
							{openItem !== c._id ? null : (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<AccordionContent challenge={c} {...{ group, navigate }}/>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				))}
		</motion.ul>
	)
}

export default Accordion
