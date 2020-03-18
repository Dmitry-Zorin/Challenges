import React from "react"
import { DataContext } from "../context/DataContext"

export const Auth = ({ Component, ...props }) => {
  const context = React.useContext(DataContext)

  return context.authorized ? <Component {...props}/>
    : context.authorized === undefined ? null
      : props.navigate("/login") && null
}
