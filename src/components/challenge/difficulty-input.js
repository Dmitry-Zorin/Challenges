import React from "react"
import { SwitcherItem } from "../switcher-item"

export const DifficultyInput = ({ difficulty, handleChange }) => {
  const difficulties = ["Easy", "Medium", "Hard"]
  const widthClass = `uk-child-width-1-${difficulties.length}`
  const active = difficulties.indexOf(difficulty)

  return (
    <div className='uk-margin-medium'>
      Difficulty
      <ul className={"uk-subnav uk-subnav-pill " + widthClass} data-uk-switcher={true} data-active={active}>
        {difficulties.map(d =>
          <SwitcherItem key={d} value={d} onClick={() => handleChange("difficulty", d)}/>,
        )}
      </ul>
    </div>
  )
}
