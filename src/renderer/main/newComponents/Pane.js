import React from 'react'
import styled from 'styled-components'


const StyledComponents = styled.div`
  padding: 1rem;
`

const Pane = ({ children }) => (
  <StyledComponents className="pane">
    {children}
  </StyledComponents>
)

export default Pane
