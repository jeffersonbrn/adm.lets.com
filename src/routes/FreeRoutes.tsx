import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<SignIn />} />
      </Routes >
    </BrowserRouter>

  );

};

export default SignRoutes;