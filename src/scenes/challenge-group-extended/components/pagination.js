import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const Pagination = ({ page, maxPage, changePage }) => (
  <ul className='uk-pagination uk-margin-medium-top'>
    <li className={page < 1 ? 'uk-disabled' : ''}>
      <a href='/#' onClick={e => changePage(e, -1)}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='icon'
          transform='shrink-3 down-0.5'
        />
        Previous
      </a>
    </li>
    <li className={(page > maxPage - 2 ? 'uk-disabled' : '') +
    ' uk-margin-auto-left'}>
      <a href='/#' onClick={e => changePage(e, 1)}>
        Next
        <FontAwesomeIcon
          icon={faChevronRight}
          className='icon-inverse'
          transform='shrink-3 down-0.5'
        />
      </a>
    </li>
  </ul>
)
