import { itemsPerPage } from 'data/settings.json'
import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import AccordionItem from './components/AccordionItem'

const Accordion = ({ challenges, page, ...props }) => {
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
					<AccordionItem
						key={c._id}
						challenge={c}
						active={openItem === c._id}
						{...{ onClick, ...props }}
					/>
				))
			}
		</motion.ul>
	)
}

export default Accordion
