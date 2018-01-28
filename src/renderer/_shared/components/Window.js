import React from 'react'
import PropTypes from 'prop-types'


const Window = ({ children }) => (
  <div className="window">
    {children}
  </div>
)

Window.propTypes = {
  children: PropTypes.node,
}

export default Window
