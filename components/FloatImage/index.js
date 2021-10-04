import React from 'react'
import styled from 'styled-components'

const FloatImage = styled.img`
  position: absolute;
  user-select: none;
`

export const Pentagon = styled(FloatImage)`
  width: 200px;
  height: 200px;
  position: absolute;
  right: -100px;
  top: -90px;
  z-index: 10;
`

export const Triangle = styled(FloatImage)`
  width: 150px;
  height: 150px;
  position: absolute;
  left: 30px;
  top: -80px;
  z-index: -5;
`

export const Oval = styled(FloatImage)`
  width: 200px;
  height: 200px;
  position: absolute;
  left: 80px;
  bottom: -120px;
  z-index: -3;
  filter: blur(2px);
`

export const Quarter = styled(FloatImage)`
  width: 80px;
  height: 80px;
  position: absolute;
  left: 250px;
  top: -100px;
  z-index: -5;
  filter: blur(4px);
`

export const Diamond = styled(FloatImage)`
  width: 120px;
  height: 120px;
  position: absolute;
  left: -70px;
  top: 200px;
  z-index: 5;
`

export default FloatImage