import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const transform = 'shrink-3 down-0.5'

export const Pagination = ({ page, maxPage, changePage }) => (
	<ul className='uk-pagination uk-margin-medium-top'>
		<li className={page < 1 ? 'uk-disabled' : ''}>
			<a href='/#' onClick={e => changePage(e, -1)}>
				<FontAwesomeIcon
					icon='chevron-left'
					className='icon-left'
					transform={transform}
				/>
				Previous
			</a>
		</li>
		<li className={`uk-margin-auto-left ${
			page > maxPage - 2 ? 'uk-disabled' : ''
		}`}>
			<a href='/#' onClick={e => changePage(e, +1)}>
				Next
				<FontAwesomeIcon
					icon='chevron-right'
					className='icon-right'
					transform={transform}
				/>
			</a>
		</li>
	</ul>
)
