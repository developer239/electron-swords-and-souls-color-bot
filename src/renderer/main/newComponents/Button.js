import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button`
  cursor: pointer;
  width: 100%;
  margin-bottom: 0.25rem;
  display: block;
`

const Button = ({ children }) => (
  <StyledButton className="btn btn-large btn-default">
    {children}
  </StyledButton>
)

export default Button
