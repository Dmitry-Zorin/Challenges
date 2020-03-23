import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { SwitcherItem } from "../../../components/switcher-item"

export const DifficultyInput = ({ difficulty, handleChange }) => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        difficulty
      }
    }
  }`).site.siteMetadata

  const difficulties = ["Easy", "Medium", "Hard"]
  const active = difficulties.indexOf(difficulty)

  return (
    <div className='uk-margin-medium'>
      {data.difficulty}
      <ul className="uk-subnav uk-subnav-pill uk-child-width-1-3" data-uk-switcher={true} data-active={active}>
        {difficulties.map(d =>
          <SwitcherItem key={d} value={d} onClick={() => handleChange("difficulty", d)}/>,
        )}
      </ul>
    </div>
  )
}
