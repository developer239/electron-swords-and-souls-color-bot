import React from 'react'
import styled from 'styled-components'
import Divider from './Divider'


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

export default PaneSidebar
