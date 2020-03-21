import React from "react"

export const SwitcherItem = ({ value, onClick }) => (
  <li className='uk-text-center'>
    <a className='a-button' href="/#" onClick={onClick}>
      {value}
    </a>
  </li>
)
