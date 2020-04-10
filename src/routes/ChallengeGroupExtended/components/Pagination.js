import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const transform = 'shrink-5 down-1.2'

export const Pagination = ({ page, maxPage, changePage }) => (
	<ul className='uk-pagination uk-margin-medium-top'>
		<li className={page < 1 ? 'uk-disabled' : ''}>
			<a href='/#' onClick={e => changePage(e, -1)}>
				<FontAwesomeIcon
					icon={faChevronLeft}
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
					icon={faChevronRight}
					className='icon-right'
					transform={transform}
				/>
			</a>
		</li>
	</ul>
)
