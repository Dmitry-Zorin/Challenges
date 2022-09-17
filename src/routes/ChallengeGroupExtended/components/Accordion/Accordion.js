import settings from 'data/settings.json'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import AccordionItem from './components/AccordionItem'

const Accordion = ({ challenges, page, ...props }) => {
	const [openItem, setOpenItem] = useState()

	return (
		<motion.ul
			className="uk-list"
			initial="initial"
			animate="animate"
			exit="initial"
			variants={{
				animate: {
					transition: {
						staggerChildren: 0.05,
					},
				},
			}}
		>
			<AnimatePresence>
				{challenges
					.slice(
						(page - 1) * settings.itemsPerPage,
						page * settings.itemsPerPage,
					)
					.map((c) => (
						<AccordionItem
							key={c._id}
							challenge={c}
							active={openItem === c._id}
							onClick={(id) => setOpenItem(openItem !== id && id)}
							{...props}
						/>
					))}
			</AnimatePresence>
		</motion.ul>
	)
}

export default Accordion
