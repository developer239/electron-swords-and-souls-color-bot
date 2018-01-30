import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledComponents = styled.div`
  padding: 1rem;
`

const Pane = ({ children }) => (
  <StyledComponents className="pane">
    {children}
  </StyledComponents>
)

Pane.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Pane
