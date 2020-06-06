import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup } from 'components'
import { AnimateSharedLayout, motion } from 'framer-motion'
import React from 'react'

const Subnav = ({ items, ...props }) => (
	<AnimateSharedLayout>
		<ButtonGroup className='uk-border-pill subnav' {...props} subnav>
			{items.map(({ active, type = 'primary', icon, value, onClick }) => (
				<div
					key={value}
					className='uk-position-relative'
					style={{ cursor: 'pointer' }}
					onMouseDown={onClick}
				>
					<div className='button'/>
					{active && (
						<motion.div
							layoutId={active && 'active'}
							className={`
								button
								uk-position-cover
								${active ? type : ''}
							`}
							animate
						/>
					)}
					<div
						className={`uk-position-cover ${active ? 'active' : ''}`}
						style={{ zIndex: 1, pointerEvents: 'none' }}
					>
						<p className='uk-position-center uk-text-uppercase uk-text-small'>
							{icon && (
								<FontAwesomeIcon
									className={value ? '' : 'icon-center'}
									{...{ icon }}
								/>
							)}
							{value}
						</p>
					</div>
				</div>
			))}
		</ButtonGroup>
	</AnimateSharedLayout>
)

export default Subnav
