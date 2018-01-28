import React from 'react'
import PropTypes from 'prop-types'


const WindowContent = ({ children }) => (
  <div className="window-content">
    {children}
  </div>
)

WindowContent.propTypes = {
  children: PropTypes.node,
}

export default WindowContent
