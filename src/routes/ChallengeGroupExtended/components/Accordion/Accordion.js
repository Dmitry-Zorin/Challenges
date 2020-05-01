import GroupItem from 'components/GroupItem'
import { itemsPerPage } from 'data/settings.json'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import OptionButton from './components/OptionButton'

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
	
	const onClick = useCallback((e, id) => {
		e.preventDefault()
		setOpenItem(openItem !== id && id)
	}, [openItem])
	
	return (
		<motion.ul
			className='uk-list'
			style={{ fontSize: '1.25em', lineHeight: 2.5 }}
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
									style={{ overflow: 'hidden' }}
								>
									<div className='uk-flex'>
										<div className={`uk-label uk-label-${labelTypes[c.difficulty.toLowerCase()]}`}>
											<p>{c.difficulty}</p>
										</div>
										<div className='uk-width-expand uk-text-right'>
											{[...options[group], 'edit', 'delete'].map(o => (
												<OptionButton
													key={o}
													challenge={c}
													option={o}
													{...{ navigate }}
												/>
											))}
										</div>
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
