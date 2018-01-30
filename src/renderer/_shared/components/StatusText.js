import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledDiv = styled.div`
  margin-top: 0.5rem;
`

const StatusText = ({ value }) => (
  <StyledDiv>
    Status: <strong>{value}</strong>
  </StyledDiv>
)

StatusText.propTypes = {
  value: PropTypes.string.isRequired,
}

export default StatusText
