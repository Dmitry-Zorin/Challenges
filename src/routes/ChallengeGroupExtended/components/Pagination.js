import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fill } from 'lodash'
import React from 'react'

const sideLength = 2

const Pagination = ({ page, maxPage, changePage }) => (
	<div className='padding'>
		<ul className='uk-pagination uk-flex-between'>
			<li className={page < 2 ? 'uk-disabled' : ''}>
				<a href='/#' onClick={e => changePage(e, page - 1)}>
					<FontAwesomeIcon icon='chevron-left'/>
					Previous
				</a>
			</li>
			{page > sideLength + 1 && (
				<li>
					<a href='/#' onClick={changePage}>1</a>
				</li>
			)}
			{page > sideLength + 2 && (
				<li className='uk-disabled'>
					<span>...</span>
				</li>
			)}
			{fill(Array(sideLength)).map((_, i) => {
				const pageNumber = page - sideLength + i
				return pageNumber > 0 && (
					<li key={i}>
						<a href='/#' onClick={changePage}>
							{pageNumber}
						</a>
					</li>
				)
			})}
			<li>
				<a href='/#' className='uk-text-primary' onClick={changePage}>
					{page}
				</a>
			</li>
			{fill(Array(sideLength)).map((_, i) => {
				const pageNumber = page + i + 1
				return pageNumber <= maxPage && (
					<li key={i}>
						<a href='/#' onClick={changePage}>
							{pageNumber}
						</a>
					</li>
				)
			})}
			{maxPage - page > sideLength + 1 && (
				<li className='uk-disabled'>
					<span>...</span>
				</li>
			)}
			{maxPage - page > sideLength && (
				<li>
					<a href='/#' onClick={changePage}>{maxPage}</a>
				</li>
			)}
			<li className={page > maxPage - 1 ? 'uk-disabled' : ''}>
				<a href='/#' onClick={e => changePage(e, page + 1)}>
					Next
					<FontAwesomeIcon icon='chevron-right' className='icon-right'/>
				</a>
			</li>
		</ul>
	</div>
)

export default Pagination
