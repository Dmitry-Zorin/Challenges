import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export const NotFoundPage = () => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        notFound
        notFoundMessage
      }
    }
  }`).site.siteMetadata

  return (
    <div className='uk-text-center'>
      <p className='uk-h2'>
        {data.notFound.toUpperCase()}
      </p>
      <p>
        {data.notFoundMessage}
      </p>
    </div>
  )
}
