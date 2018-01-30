import React from 'react'
import styled from 'styled-components'
import Divider from './Divider'
import PropTypes from 'prop-types'


const StyledDiv = styled.div`
  padding: 1rem;
`

const PaneSidebar = ({ children, shouldShowDivider }) => (
  <div>
    <StyledDiv>
      {children}
    </StyledDiv>
    {shouldShowDivider && <Divider />}
  </div>
)

PaneSidebar.defaultProps = {
  shouldShowDivider: false,
}

PaneSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  shouldShowDivider: PropTypes.bool,
}

export default PaneSidebar
