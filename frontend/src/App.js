import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import LendingPage from "./page/LendingPage";
import Dashboard from "./admin/component/Dashboard";
import SvgsList from "./admin/component/SvgsList";
import RegisterAd from "./admin/component/Register";
import ContributedSvgsList from "./admin/component/ContributedSvgsList";
import RegisterUser from "./component/RegisterUser";
import LoginUser from "./page/LoginUser";
import AuthUser from "./AuthUser";
import AdComponent from "./AdComponent";
// import LoginAd from "./admin/component/LoginAd";

function App() {

  const baseUrl = 'http://127.0.0.1:3001/'

  return (
    <>
      <Routes>
      {/* user */}
      <Route path='/user-register' element={<RegisterUser baseUrl={baseUrl}/>}/>
          <Route path='/user-login' element={<LoginUser/>}/>
          <Route path='/' element={<LendingPage baseUrl={baseUrl} />}/>


      {/* Admin */}
      {/* <Route path='/admin-login' element={<LoginAd/>}/> */}
      <Route path='/admin-register' element={<RegisterAd/>}/>
            <Route path='/admin-dashboard' element={< AuthUser cmp={Dashboard} baseUrl={baseUrl}/>}/>
            <Route path='/admin-dashboard/svgslist' element={<AuthUser cmp={SvgsList} baseUrl={baseUrl}/>}/>
            <Route path='/admin-dashboard/contributedSvgslist' element={<AuthUser cmp={ContributedSvgsList} />}/>
        </Routes>
        
      {/* <AdComponent slot="9753906753" timeout={1000}/> */}
    </>
  );
}

export default App;

