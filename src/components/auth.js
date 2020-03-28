import React, { useContext } from 'react'
import { DataContext } from '../services/contexts/DataContext'

export const Auth = ({ Component, ...props }) => {
  const context = useContext(DataContext)

  return context.isAuthorized ? <Component {...props}/>
    : context.isAuthorized === undefined ? null
      : props.navigate('/login') && null
}
