import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const transform = 'shrink-3 down-0.5'

const Pagination = ({ page, maxPage, changePage }) => (
	<ul className='uk-pagination uk-margin-medium-top uk-flex-between'>
		<li className={page < 1 ? 'uk-disabled' : ''}>
			<a href='/#' onClick={e => changePage(e, -1)}>
				<FontAwesomeIcon icon='chevron-left' {...{ transform }}/>
				Previous
			</a>
		</li>
		<li className={page > maxPage - 2 ? 'uk-disabled' : ''}>
			<a href='/#' onClick={e => changePage(e, +1)}>
				Next
				<FontAwesomeIcon
					icon='chevron-right'
					className='icon-right'
					{...{ transform }}
				/>
			</a>
		</li>
	</ul>
)

export default Pagination
