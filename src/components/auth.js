import React from "react"
import { DataContext } from "../context/DataContext"

export const Auth = props => {
  const context = React.useContext(DataContext)

  return context.authorized ? <props.component/>
    : context.authorized === undefined ? null
      : props.navigate("/login") && null
}
