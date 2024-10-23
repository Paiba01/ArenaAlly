import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '~/services/routing/Routes/constants'

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
  font-family: 'circular';
`

const Title = styled.h1`
  color: #00bf63;
  font-size: 7rem;
  margin-bottom: 2rem;
  margin-top: 8%;
  text-align: top;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
`

const StartButton = styled.button`
  width: 180px;  
  height: 180px;
  padding: 4em;
  font-size: 3rem;
  color: white;
  margin-top: 4%;
  background-color: #00bf63;
  border: none;
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1fb16b;
    padding: 4.2em;
  }
`

export const StartPage = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(ROUTES.LOGIN); 
  };
  return (
    <StartPageContainer>
      <Title>ArenaAlly</Title>
      <StartButton onClick={handleClick}>Empezar</StartButton>
    </StartPageContainer>
  )
}
