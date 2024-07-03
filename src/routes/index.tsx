import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from '@/pages/Login/index'
import Home from '@/pages/Home/index'
import User from '@/pages/User'
import Seal from '@/pages/Seal'
import SealType from '@/pages/SealType'
import SealApply from '@/pages/SealApply'
import SealApproval from '@/pages/SealApproval'
import SealMake from '@/pages/sealMake'
import Cert from '@/pages/Cert'

const Router: FC = () => {
  return (
    <Routes>
      <Route element={<Navigate to="/home/user" />} path="/home" />
      <Route element={<Login />} path="/login" />
      <Route element={<Home />} path="/home">
        <Route element={<User />} path="/home/user" />
        <Route element={<Seal />} path="/home/seal" />
        <Route element={<SealType />} path="/home/sealType" />
        <Route element={<SealApply />} path="/home/sealApply" />
        <Route element={<SealApproval />} path="/home/sealApproval" />
        <Route element={<SealMake />} path="/home/sealMake" />
        <Route element={<Cert />} path="/home/cert" />
      </Route>
      <Route element={<Navigate to="/home" />} path="*" />
    </Routes>
  )
}

export default Router
