import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export const Search = ({ onChange }) => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        search
      }
    }
  }`).site.siteMetadata

  return (
    <div className='uk-search uk-search-default uk-width-expand uk-margin-small'>
      <span data-uk-search-icon={true}/>
      <input
        type='search' className='uk-search-input'
        placeholder={data.search + '...'} onChange={onChange}
      />
    </div>
  )
}