import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'
import Home from '~/pages/home/page'
import { Admin } from '~/pages/admin/page'


const AppRoutes = () => (
  <Suspense fallback={<>Loading...</>}>
    <Routes>
       <Route path={ROUTES.HOME} element={<Home />}/>
       <Route path={ROUTES.ADMIN} element={<Admin />}/>
       <Route path="*" element={<Navigate to={ROUTES.HOME} />}/>
    </Routes>
  </Suspense>
)

export default AppRoutes
