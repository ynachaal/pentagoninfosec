/* eslint-disable no-unused-vars */
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { GlobalLoading } from 'react-global-loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComp from './components/header/presentation'
import Home from './pages/home/components';
import FooterComp from './components/footer/presentation';
import { AuthProvider } from './components/authentication/context/AuthContext';
import Questionaire from './pages/questionaire/components';
import { HomeProvider } from './pages/home/context/HomeContext';
import { CommonProvider } from './utils/context/CommonContext';
import Console from './pages/dashboard/components';
import CertificateRegistration from './pages/dashboard/components/CertificateRegistration';
import { DashboardProvider } from './pages/dashboard/context/DashboardContext';
import ExpiryCertificates from './pages/dashboard/components/ExpiryCertificates';
import IssuedCertificates from './pages/dashboard/components/IssuedCertificates';
import { QuestionaireProvider } from './pages/questionaire/context/QuestionaireContext';
import requireAdminAuth from './common/RequireAdminAuth';
import requireUserAuth from './common/RequireUserAuth';
import accountSettings from './pages/dashboard/components/Settings';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/'
  // const isQuestionairePage = location.pathname === '/questionaire';
  // const isDashboardPage = location.pathname === '/dashboard';
  // const isCompany = location.pathname === '/dashboard/company'

  return (
    <>
      <GlobalLoading />

      <ToastContainer />
      <AuthProvider>
        <CommonProvider>
          <DashboardProvider>
            <HomeProvider>
              <QuestionaireProvider>

                {/* Header */}
                {isHome && < HeaderComp />}
                <GlobalLoading />
                <Routes>
                  {/* Home Route */}
                  <Route exact path="/" Component={Home} />

                  {/* Dashboard Routes */}
                  <Route exact path="/dashboard" Component={requireUserAuth(Console)} >
                    {/* admin auth */}
                    <Route exact path="/dashboard/generate-certificate" Component={requireAdminAuth(CertificateRegistration)} />
                    <Route exact path="/dashboard/expire-certificates" Component={requireAdminAuth(ExpiryCertificates)} />
                    <Route exact path="/dashboard/issue-certificates" Component={requireAdminAuth(IssuedCertificates)} />
                    {/* user auth */}
                    <Route exact path="/dashboard/account-settings" Component={requireUserAuth(accountSettings)} />
                  </Route>

                  {/* Questionaire */}
                  <Route exact path="/questionaire" Component={Questionaire} />
                </Routes>

                {/* Footer */}
                {isHome && < FooterComp />}
              </QuestionaireProvider>
            </HomeProvider>
          </DashboardProvider>
        </CommonProvider>
      </AuthProvider>
    </>
  )
}

export default App
