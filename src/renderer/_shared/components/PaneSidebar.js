import React from 'react'
import PropTypes from 'prop-types'


const PaneSidebar = ({ children }) => (
  <div className="pane-sm sidebar">
    {children}
  </div>
)

PaneSidebar.propTypes = {
  children: PropTypes.node,
}

export default PaneSidebar
