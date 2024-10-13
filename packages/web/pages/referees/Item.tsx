import styled from 'styled-components'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import isActive from 'shared/assets/icons/isActive.svg?react'
import { User } from '~/models/User'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const CompetitionCard = styled.div`
  background-color: #edf5e9;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 70%;
`

const Name = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  margin-bottom: 1em;
`
const Elements = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftColumn = styled.div`
  width: 75%;
`

const RightColumn = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Atributes = styled.span`
  font-size: 16px;
  margin-right: 4em;
`

const StatusIndicator = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? 'green' : 'red')};
  font-weight: bold;
`

const ActionButton = styled.button<{
  backgroundColor: string
  hoverColor: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.8rem;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: white;
`

export const UserTable: React.FC<{ user: User }> = ({ user }) => {
  const statusColor = user.isActive ? 'green' : 'red'

  return (
    <CenteredContainer>
      <CompetitionCard>
        <Elements>
          <LeftColumn>
            <Name>{user.name}</Name>
            <p>
              <Atributes>Correo: {user.email}</Atributes>
            </p>
          </LeftColumn>
          <RightColumn>
            <ActionButton
              backgroundColor={statusColor}
              hoverColor={user.isActive ? '#00a000' : '#bd0000'}
            >
              <StyledIcon as={isActive} />
            </ActionButton>
            <ActionButton backgroundColor="#e3e300" hoverColor="#cbcb14">
              <StyledIcon as={EditIcon} />
            </ActionButton>
          </RightColumn>
        </Elements>
      </CompetitionCard>
    </CenteredContainer>
  )
}
