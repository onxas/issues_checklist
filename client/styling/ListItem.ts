import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
`


interface TitleProps {
    checked?: boolean
}

export const Title = styled.span<TitleProps>`
  font-weight: 600;
  padding-left: 5px;
  ${({checked}) => checked && {textDecoration: 'line-through'}}
`

export const StatusAndActionsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: start;
`


export const DeleteButtonContainer = styled.div`
  padding-left: 5px;
  cursor: pointer;
`
