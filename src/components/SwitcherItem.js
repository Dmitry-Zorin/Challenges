import React from 'react'

export const SwitcherItem = ({ value, active, onClick }) => (
  <li className={(active ? 'uk-active' : '') + ' uk-text-center'}>
    <a href='/#' onClick={e => {
      e.preventDefault()
      onClick()
    }}>
      {value}
    </a>
  </li>
)
