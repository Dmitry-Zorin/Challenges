import React from "react"
import { Loading } from "./loading"

export const LazyComponent = ({ Component, ...props }) =>
  <React.Suspense fallback={<Loading/>}>
    <Component {...props} />
  </React.Suspense>
