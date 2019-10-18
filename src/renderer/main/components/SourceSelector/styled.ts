import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`

export const SourceContainer = styled.div`
  padding: 10px;

  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`

export const Thumbnail = styled.img``

export const Title = styled.span`
  display: block;
  margin-bottom: 20px;
`
