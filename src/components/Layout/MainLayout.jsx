import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeroAndProjects from '../Header/HeroAndProjects';
import { useLocation } from 'react-router-dom';

function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <div className="min-h-screen bg-[#0b0a09] text-[#f4ece6] flex flex-col selection:bg-brand-500 selection:text-white">
      <Header />
      {isHome && <HeroAndProjects />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
