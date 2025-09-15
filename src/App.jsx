import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './pages/Services';
import './index.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <div className="animated-gradient-bg min-h-screen flex flex-col relative">
      {showHeader && <Header />}
      <div className="lines z-10">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Services />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
