import GroupItem from 'components/GroupItem'
import { itemsPerPage } from 'data/settings.json'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import OptionButtons
	from 'routes/ChallengeGroupExtended/components/Accordion/components/OptionButtons'

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

const Accordion = ({ challenges, page, group, navigate }) => {
	const [openItem, setOpenItem] = useState()
	
	return (
		<motion.ul
			className='uk-list'
			style={{ fontSize: '1.25em', lineHeight: 2 }}
			variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
		>
			{challenges.slice((page - 1) * itemsPerPage, page * itemsPerPage)
				.map((c, i) => (
					<li key={i}>
						<a
							href='/#'
							onClick={e => {
								e.preventDefault()
								setOpenItem(openItem !== i && i)
							}}
						>
							<GroupItem challenge={c} {...{ group }} extended/>
						</a>
						<AnimatePresence initial={false}>
							{openItem !== i ? null : (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25 }}
									style={{ overflow: 'hidden' }}
								>
									<div className='uk-flex uk-margin-small-top'>
										<div className={`uk-label uk-label-${labelTypes[c.difficulty.toLowerCase()]}`}>
											<p>{c.difficulty}</p>
										</div>
										<OptionButtons
											challenge={c}
											options={options[group]}
											{...{ navigate }}
										/>
									</div>
									<hr className='uk-margin-remove-bottom'/>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				))}
		</motion.ul>
	)
}

export default Accordion
