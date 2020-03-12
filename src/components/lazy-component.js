import React from "react"
import Loading from "./loading"

const LazyComponent = ({ Component, ...props }) =>
  <React.Suspense fallback={<Loading/>}>
    <Component {...props} />
  </React.Suspense>

export default LazyComponent
