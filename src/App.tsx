import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";

import Login from "@/pages/Login/index";
import Home from "@/pages/Home/index";
import User from '@/pages/Home/components/User';
import Seal from '@/pages/Home/components/Seal';
import SealType from '@/pages/Home/components/SealType';
import SealApply from '@/pages/Home/components/SealApply';
import SealApproval from '@/pages/Home/components/SealApproval';
import SealMake from '@/pages/Home/components/sealMake';
import Cert from '@/pages/Home/components/Cert';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/home' element={<Navigate to="/home/user" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} >
        <Route path="/home/user" element={<User />}></Route>
        <Route path="/home/seal" element={<Seal />}></Route>
        <Route path="/home/sealType" element={<SealType />}></Route>
        <Route path="/home/sealApply" element={<SealApply />}></Route>
        <Route path="/home/sealApproval" element={<SealApproval />}></Route>
        <Route path="/home/sealMake" element={<SealMake />}></Route>
        <Route path="/home/cert" element={<Cert />}></Route>
      </Route>
      <Route path='*' element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
