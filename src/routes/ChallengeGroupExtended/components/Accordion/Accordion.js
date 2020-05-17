import { itemsPerPage } from 'data/settings.json'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import AccordionItem from './components/AccordionItem'

const Accordion = ({ challenges, page, ...props }) => {
	const [openItem, setOpenItem] = useState()
	
	const onClick = (e, id) => {
		e.preventDefault()
		setOpenItem(openItem !== id && id)
	}
	
	return (
		<motion.ul
			className='uk-list'
			variants={{
				animate: {
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<AnimatePresence>
				{challenges.slice((page - 1) * itemsPerPage, page * itemsPerPage)
					.map(c => (
						<AccordionItem
							key={c._id}
							challenge={c}
							active={openItem === c._id}
							{...{ onClick, ...props }}
						/>
					))
				}
			</AnimatePresence>
		</motion.ul>
	)
}

export default Accordion
