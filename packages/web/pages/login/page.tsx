import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useGetUserByEmail } from '~/hooks/users/useGetUserByEmail'
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

interface InputProps {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  width: 80%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.error ? 'red' : '#ddd'};
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
  background-color: #006133;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #047d41;
  }
`

const ErrorText = styled.span`
  color: red;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  margin-bottom: 1em;
`

const RegisterText = styled.a`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.7rem;
  text-align: left;
  text-decoration: underline;  
  cursor: pointer;
  align-self: flex-start;       
  margin-left: 10%;             
`

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { refetch: getUserByEmail, data: userData, isError } = useGetUserByEmail(email)

  const handleClick = async () => {
    setEmailError('')
    setPasswordError('')
    setIsSubmitting(true)

    try {
      await getUserByEmail()

      if (isError) {
        setEmailError('Error al buscar el usuario. Por favor, intente de nuevo.')
        return
      }

      if (!userData) {
        setEmailError('No se ha encontrado un usuario con este email.')
        return
      }

      if (userData.password !== password) {
        setPasswordError('Contraseña incorrecta.')
        return
      }

      await new Promise(resolve => setTimeout(resolve, 5000))

      if (userData.isAdmin) {
        navigate(`${ROUTES.ADMIN.replace(':userId', userData._id)}`)
      } else {
        navigate(`${ROUTES.HOME.replace(':userId', userData._id)}`)
      }
    } catch (error) {
      setEmailError('Ocurrió un error inesperado. Por favor, intente de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER)
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
          onChange={handleEmailChange}
          error={!!emailError}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <Button onClick={handleClick} disabled={isSubmitting}>
          {isSubmitting ? 'Cargando...' : 'Entrar'}
        </Button>
        {/* Texto de registro con subrayado y redirección */}
        <RegisterText onClick={handleRegisterClick}>
          ¿Aún no estás registrado? Pulsa aquí para registrarte
        </RegisterText>
      </LoginCard>
    </StartPageContainer>
  )
}
