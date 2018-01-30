import React from 'react'
import PropTypes from 'prop-types'


const PaneGroup = ({ children }) => (
  <div className="pane-group">
    {children}
  </div>
)

PaneGroup.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PaneGroup
