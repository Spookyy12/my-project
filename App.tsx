import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CrisisBanner from './components/CrisisBanner';
import EmailToast from './components/EmailToast';
import Home from './pages/Home';
import Communication from './pages/Communication';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Volunteer from './pages/Volunteer';
import Legal from './pages/Legal';
import { AuthProvider } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-slate-700 bg-sand-50/85 backdrop-blur-sm">
          <CrisisBanner />
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/communicate" element={<Communication />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/legal" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
          <EmailToast />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;