import React from "react"
import { DataContext } from "../context/DataContext"

export const Auth = ({ Component, navigate }) => {
  const context = React.useContext(DataContext)

  return context.authorized ? <Component navigate={navigate}/>
    : context.authorized === undefined ? null
      : navigate("/login") && null
}
