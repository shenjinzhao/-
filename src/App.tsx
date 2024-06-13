import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";

import Login from "@/pages/Login/index";
import Home from "@/pages/Home/index";
import User from '@/pages/Home/components/User';
import Seal from '@/pages/Home/components/Seal';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/home' element={<Navigate to="/home/user" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} >
        <Route path="/home/user" element={<User />}></Route>
        <Route path="/home/seal" element={<Seal />}></Route>
      </Route>
      <Route path='*' element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
