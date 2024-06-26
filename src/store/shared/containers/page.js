import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { mapStateToProps, mapDispatchToProps } from "../containerProps"
import { PageContainer } from "theme"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageContainer)
)
