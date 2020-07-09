import React, { useEffect,useState } from 'react'
import { BoxLink } from '@components/Box'
import styled from 'styled-components'

const EventContainer = styled(BoxLink)`
  align-items: flex-start;
  flex-direction: row;
  text-align: left;
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};
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