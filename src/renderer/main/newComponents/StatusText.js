import React from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
  margin-top: 0.5rem;
`

const StatusText = ({ value }) => (
  <StyledDiv>
    Status: <strong>{value}</strong>
  </StyledDiv>
)

export default StatusText
