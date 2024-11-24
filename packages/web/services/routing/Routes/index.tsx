import { Suspense } from 'react'
import {
  matchPath,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import LogoutIcon from 'shared/assets/icons/logoutIcon.svg?react'
import { ROUTES } from './constants'
import Home from '~/pages/home/page'
import { Admin } from '~/pages/admin/page'
import { Competitions } from '~/pages/competitions/page'
import { Referees } from '~/pages/referees/page'
import { Designate } from '~/pages/designate/page'
import { My_designations } from '~/pages/my_designations/page'
import { Documents } from '~/pages/documents/page'
import { Matchs } from '~/pages/matchs/page'
import { StartPage } from '~/pages/startPage/page'
import { Login } from '~/pages/login/page'
import styled from 'styled-components'
import { CreateCompetitions } from '~/pages/competitions/createPage/page'
import { EditCompetitions } from '~/pages/competitions/editPage/page'
import { EditMatchs } from '~/pages/matchs/editMatch/page'
import { EditReferee } from '~/pages/referees/editReferee/page'
import { Register } from '~/pages/register/page'
import { DesignateMatchs } from '~/pages/designateMatchs/page'
import { DesignateReferees } from '~/pages/designateMatchs/designateReferees/page'

export const BackgroundContainer = styled.div`
  background-color: #c8e6c9;
  width: 100vw;
  height: calc(100vh - 7rem);
  padding-top: 7rem;
  overflow-x: hidden;
  font-family: 'circular';
`

const Navbar = styled.div`
  position: fixed;
  background-color: #388e3c;
  height: 7rem;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;
  justify-content: space-between;
`

const HomeContainer = styled.div`
  color: #004100;
  font-size: 3rem;
  font-weight: bold;
  width: 15rem;
  height: 100%;
  background-color: #2e7d32;
  display: flex;
  padding: 0 0rem 0 6rem;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, calc(100% - 3rem) 100%, 0 100%);
`

const CurrentRouteContainer = styled.div`
  color: #004100;
  font-size: 3rem;
  font-weight: bold;
  width: 15rem;
  height: 100%;
  display: flex;
  align-items: center;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  color: #004100;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 2rem;

  &:hover > svg {
    width: 40px;
    height: 40px;
  }
`

const StyledIcon = styled.svg`
  width: 32px;
  height: 32px;
  fill: white;
`

const LayoutWithBackground = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const routes = [
    {
      label: 'Partidos',
      value: '/competitions/:competitionId/matchs/:matchId',
    },
    {
      label: 'Partidos',
      value: '/competitions/:competitionId/:userId/matchs/edit/*',
    },
    {
      label: 'Competiciones',
      value: '/competitions/*',
    },
    {
      label: 'Árbitros',
      value: '/referees/*',
    },
    {
      label: 'Designar',
      value: '/designate/*',
    },
    {
      label: 'Designaciones',
      value: '/my-designations/*',
    },
    {
      label: 'Documentos',
      value: '/documents/*',
    },
  ]

  const activeRoute = routes.find((route) => matchPath(route.value, pathname))

  const handleClick = () => {
    setTimeout(() => {
      navigate(ROUTES.STARTPAGE)
    }, 1000)
  }

  return (
    <>
      <BackgroundContainer>
        <Navbar>
          <div style={{ display: 'flex', height: '100%' }}>
            <HomeContainer>Arenally</HomeContainer>
            {activeRoute && (
              <CurrentRouteContainer>{activeRoute.label}</CurrentRouteContainer>
            )}
          </div>
          <ActionButton onClick={handleClick}>
            <StyledIcon as={LogoutIcon} />
          </ActionButton>
        </Navbar>
        <Outlet />
      </BackgroundContainer>
    </>
  )
}

const AppRoutes = () => (
  <Suspense fallback={<>Loading...</>}>
    <Routes>
      <Route element={<LayoutWithBackground />}>
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COMPETITIONS} element={<Competitions />} />
        <Route
          path={ROUTES.CREATECOMPETITIONS}
          element={<CreateCompetitions />}
        />
        <Route path={ROUTES.EDITCOMPETITIONS} element={<EditCompetitions />} />
        <Route path={ROUTES.REFEREES} element={<Referees />} />
        <Route path={ROUTES.EDITREFEREE} element={<EditReferee />} />
        <Route path={ROUTES.DESIGNATE} element={<Designate />} />
        <Route path={ROUTES.DESIGNATEMATCHS} element={<DesignateMatchs />} />
        <Route
          path={ROUTES.DESIGNATEREFEREES}
          element={<DesignateReferees />}
        />
        <Route path={ROUTES.MY_DESIGNATIONS} element={<My_designations />} />
        <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
        <Route path={ROUTES.MATCHS} element={<Matchs />} />
        <Route path={ROUTES.EDITMATCHS} element={<EditMatchs />} />
      </Route>

      <Route path={ROUTES.STARTPAGE} element={<StartPage />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route path="*" element={<Navigate to={ROUTES.STARTPAGE} />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
