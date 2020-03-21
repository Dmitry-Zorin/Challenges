import React from "react"
import { SwitcherItem } from "../../../components/switcher-item"

export const DifficultyInput = ({ difficulty, handleChange }) => {
  const difficulties = ["Easy", "Medium", "Hard"]
  const active = difficulties.indexOf(difficulty)

  return (
    <div className='uk-margin-medium'>
      Difficulty
      <ul className="uk-subnav uk-subnav-pill uk-child-width-1-3" data-uk-switcher={true} data-active={active}>
        {difficulties.map(d =>
          <SwitcherItem value={d} onClick={() => handleChange("difficulty", d)}/>,
        )}
      </ul>
    </div>
  )
}
