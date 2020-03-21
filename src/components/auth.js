import React from "react"
import { DataContext } from "../context/DataContext"

export const Auth = ({ Component, ...props }) => {
  const context = React.useContext(DataContext)

  return context.isAuthorized ? <Component {...props}/>
    : context.isAuthorized === undefined ? null
      : props.navigate("/login") && null
}
