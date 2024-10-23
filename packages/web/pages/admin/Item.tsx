import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '~/services/routing/Routes/constants'

const Container = styled(Link)<{ $color: string; $image: string }>`
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  border: none;
  cursor: pointer;
  padding: 20px;
  font-size: 18px;
  transition: transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ $color }) => $color};
    opacity: 0.6;
    z-index: 1;
  }

  &:hover > span {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`

const Title = styled.span`
  position: relative;
  z-index: 2;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-align: center;
  padding: 10px;
  transition: transform 0.3s ease;
`

export const Item = ({
  color,
  label,
  image,
  to,
}: {
  color: string
  label: string
  image: string
  to: string
}) => {
  return (
    <Container $color={color} $image={image} to={to}>
      <Title>{label}</Title>
    </Container>
  )
}
