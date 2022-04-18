import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
//import Packages Pages
import ListPackages from '../pages/Package';
import ViewPackage from '../pages/Package/view.package';
import AddPackages from '../pages/Package/add.package';
import EditPackages from '../pages/Package/edit.package';
import AlterStatusPackages from '../pages/Package/alter.status.package';
import UploadsPackages from '../pages/Upload/uploads.packages';

const OtherRoutes: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
          //Profile
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
            //PackagesPages
        <Route path="/packages" element={<ListPackages />} />
        <Route path="/packages/:package_id/view" element={<ViewPackage />} />
        <Route path="/packages/create" element={<AddPackages />} />
        <Route path="/packages/:package_id/update" element={<EditPackages />} />
        <Route path="/packages/:package_id/updatePackagePosition" element={<AlterStatusPackages />} />
        <Route path="/packages/:package_id/uploadFile" element={<UploadsPackages />} />
          //Page not fould
        <Route path="/*" element={<Home />} />
      </Routes >
    </BrowserRouter>

  );

};

export default OtherRoutes;