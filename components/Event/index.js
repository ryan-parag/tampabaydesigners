import React, { useEffect,useState } from 'react'
import styled from 'styled-components'

const EventContainer = styled.a`
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  background: var(--gray100);
  border: 1px solid var(--gray300);
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  transition: all 120ms ease-out 0s;
  &:visited {
    color: inherit;
  }
  &:hover, &:focus {
    background: var(--gray200);
    border-color: var(--gray400);
    outline: none;
    color: inherit;
  }
  &:focus {
    border-color: var(--orange);
  }
  &:active {
    border-color: var(--gray400);
    color: var(--gray700);
    box-shadow: inset 0px 0px ${({ theme }) => theme.space[3]} var(--gray400);
  }
`

const EventDescription = styled.p`
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const EventTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const EventImg = styled.img`
  display: inline-block;
  margin-right: ${({ theme }) => theme.space[3]};
  border-radius: 50%;
`

export default function Event({img, org, name, description, date, link}) {

  const truncate = str => {
    return str.length > 70 ? str.substring(0, 70) + "..." : str;
  }

  return(
    <EventContainer href={link} target="_blank">
      <EventImg src={img} width="56" alt={org} />
      <div>
        <EventTitle>
          {name}
        </EventTitle>
        <EventDescription>
          {truncate(description)}
        </EventDescription>
        <small><strong>{date}</strong> • {org}</small>
      </div>
    </EventContainer>
  )
}