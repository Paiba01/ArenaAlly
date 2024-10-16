import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

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
import { Login } from '~/pages/Login/page'
import styled from 'styled-components'
import { CreateCompetitions } from '~/pages/competitions/createPage/page'
import { EditCompetitions } from '~/pages/competitions/editPage/page'
import { EditMatchs } from '~/pages/matchs/editMatch/page'

const BackgroundContainer = styled.div`
  background-image: url('/images/background-app2.png');
  background-size: cover;
  background-position: center; 
  width: 100vw; 
  height: 100vh; 
 
`;

const LayoutWithBackground = () => {
  return (
    <BackgroundContainer>
      <Outlet /> {}
    </BackgroundContainer>
  );
};

const AppRoutes = () => (
  <Suspense fallback={<>Loading...</>}>
    <Routes>
      <Route element={<LayoutWithBackground />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path={ROUTES.COMPETITIONS} element={<Competitions />} />
        <Route path={ROUTES.CREATECOMPETITIONS} element={<CreateCompetitions />} />
        <Route path={ROUTES.EDITCOMPETITIONS} element={<EditCompetitions />} />
        <Route path={ROUTES.REFEREES} element={<Referees />} />
        <Route path={ROUTES.DESIGNATE} element={<Designate />} />
        <Route path={ROUTES.MY_DESIGNATIONS} element={<My_designations />} />
        <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
        <Route path={ROUTES.MATCHS} element={<Matchs />} />
        <Route path={ROUTES.EDITMATCHS} element={<EditMatchs />} />
      </Route>

      <Route path={ROUTES.STARTPAGE} element={<StartPage />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
