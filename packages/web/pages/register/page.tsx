import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { useCreateUser } from '~/hooks/competitions/useCreateUser'
import { useGetUserByEmail } from '~/hooks/users/useGetUserByEmail'
import { ROUTES } from '~/services/routing/Routes/constants'
import { NewUser } from '~/models/newUser'

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

const RegisterText = styled.span`
  font-size: 3rem;
  color: white;
  margin-bottom: 2.7rem;
`

interface InputProps {
  error?: boolean
}

const Input = styled.input<InputProps>`
  width: 80%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
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

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 83%;
  margin-bottom: 2rem;
`

const SmallInput = styled.input<InputProps>`
  width: 40%;
  padding: 0.8rem;
  margin-right: 0.2rem;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;

  &::placeholder {
    color: #d1d1d1;
  }

  &::selection {
    background-color: #006400;
  }
`

const ErrorText = styled.span`
  color: red;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  margin-bottom: 1em;
`

const LoginText = styled.a`
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

export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { refetch: getUserByEmail, data: existingUser, isError } = useGetUserByEmail(email)
  const createUser = useCreateUser()

  const handleClick = async () => {
    setNameError('')
    setPasswordError('')
    setEmailError('')
    setIsSubmitting(true)

    if (!name) {
      setNameError('El nombre es obligatorio.')
      setIsSubmitting(false)
      return
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.')
      setIsSubmitting(false)
      return
    }

    if (!email) {
      setEmailError('El email es obligatorio.')
      setIsSubmitting(false)
      return
    }

    try {

      await getUserByEmail()
      if (existingUser) {
        setEmailError('Ya existe un usuario con este correo electrónico.')
        setIsSubmitting(false)
        return
      }

      const id = uuidv4()
      const newUser: NewUser = { id, name, email, password }
      await createUser.mutateAsync(newUser)

      navigate(ROUTES.HOME.replace(':userId', id))
    } catch (error) {
      setEmailError('Error al crear el usuario. Intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameError('')
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handleRegisterClick = () => {
    navigate(ROUTES.LOGIN)
  }

  return (
    <StartPageContainer>
      <Title>ArenaAlly</Title>
      <LoginCard>
        <RegisterText>Registrarse</RegisterText>
          {nameError && <ErrorText>{nameError}</ErrorText>}
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <InputGroup>
          <SmallInput
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
          />
          
          <SmallInput
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
          />
        </InputGroup>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}
        <Button onClick={handleClick} disabled={isSubmitting}>
          {isSubmitting ? 'Cargando...' : 'Confirmar registro'}
        </Button>
        <LoginText onClick={handleRegisterClick}>
          ¿Ya tienes cuenta? Pulsa aquí para iniciar sesión
        </LoginText>
      </LoginCard>
    </StartPageContainer>
  )
}
