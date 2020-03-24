import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { graphql, useStaticQuery } from "gatsby"

export const Pagination = ({ page, maxPage, changePage }) => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        previous
        next
      }
    }
  }`).site.siteMetadata

  return (
    <ul className="uk-pagination uk-margin-medium-top">
      <li className={page < 1 ? "uk-disabled" : ""}>
        <a href='/#' onClick={e => changePage(e, -1)}>
          <FontAwesomeIcon icon={faChevronLeft} className='icon' transform='shrink-3 down-0.5'/>
          {data.previous}
        </a>
      </li>
      <li className={(page > maxPage - 2 ? "uk-disabled" : "") + " uk-margin-auto-left"}>
        <a href='/#' onClick={e => changePage(e, 1)}>
          {data.next}
          <FontAwesomeIcon icon={faChevronRight} className='icon-inverse' transform='shrink-3 down-0.5'/>
        </a>
      </li>
    </ul>
  )
}
