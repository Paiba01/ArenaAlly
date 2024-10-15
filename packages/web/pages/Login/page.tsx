import React from 'react'
import styled from 'styled-components'

const StartPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url('/images/background-start2.png'); 
  background-size: cover;
  background-position: center;

  overflow: hidden;
`

const Title = styled.h1`
  color: #00bf63;
  font-size: 7rem;
  margin-bottom: 2rem;
  margin-top: 8%;
  text-align: top;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
`



export const Login = () => {
  return (
    <StartPageContainer>
      <Title className="title">ArenaAlly</Title>

    </StartPageContainer>
  )
}
