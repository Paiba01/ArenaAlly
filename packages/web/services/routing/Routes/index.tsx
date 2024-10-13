import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'
import Home from '~/pages/home/page'
import { Admin } from '~/pages/admin/page'
import { Competitions } from '~/pages/competitions/page'
import { Referees } from '~/pages/referees/page'
import { Designate } from '~/pages/designate/page'
import { My_designations } from '~/pages/my_designations/page'
import { Documents } from '~/pages/documents/page'
import { Matchs } from '~/pages/matchs/page'

const AppRoutes = () => (
  <Suspense fallback={<>Loading...</>}>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ADMIN} element={<Admin />} />
      <Route path={ROUTES.COMPETITIONS} element={<Competitions />} />
      <Route path={ROUTES.REFEREES} element={<Referees />} />
      <Route path={ROUTES.DESIGNATE} element={<Designate />} />
      <Route path={ROUTES.MY_DESIGNATIONS} element={<My_designations />} />
      <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
      <Route path={ROUTES.MATCHS} element={<Matchs />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
