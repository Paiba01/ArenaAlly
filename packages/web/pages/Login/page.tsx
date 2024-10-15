import React, { useState } from 'react'
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
`
const Title = styled.h1`
  color: #00bf63;
  font-size: 7rem;
  margin-bottom: 6rem;
  margin-top: 8%;
  text-align: top;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
`

const LoginCard = styled.div`
  background-color: #1fb16b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 40%;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoginText = styled.span`
  font-size: 3rem;
  color: white;
  margin-bottom: 2.7rem;
`

const Input = styled.input`
  width: 80%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;

  &::placeholder {
    color: #d1d1d1;
  }
`

const Button = styled.button`
  width: 80%;
  padding: 0.8rem;
  background-color: #00a859;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #008c47;
  }
`

export const Login = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleClick = () => {
    if (email === 'paiba2012@gmail.com') {
      navigate(ROUTES.ADMIN)
    } else {
      navigate(ROUTES.HOME)
    }
  }

  return (
    <StartPageContainer>
      <Title>ArenaAlly</Title>
      <LoginCard>
        <LoginText>Iniciar Sesión</LoginText>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input type="password" placeholder="Contraseña" />
        <Button onClick={handleClick}>Ingresar</Button>
      </LoginCard>
    </StartPageContainer>
  )
}
