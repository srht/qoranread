import { useEffect, useState } from 'react';
import SurahList from './components/SurahList';
import FatihaWordView from './components/FatihaWordView';
import SurahWordView from './components/SurahWordView';

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  const m = hash.match(/^\/surah\/(\d+)$/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= 114) return { name: 'surah', number: n };
  }
  return { name: 'list' };
}

export default function App() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Sayfa değişiminde yukarı kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name, route.number]);

  const navigate = (path) => {
    window.location.hash = path;
  };

  const goBack = () => navigate('/');

  return (
    <div
      className="parchment min-h-screen"
      style={{
        paddingTop: '3rem',
        paddingBottom: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {route.name === 'list' && (
        <SurahList onSelect={(n) => navigate(`/surah/${n}`)} />
      )}

      {route.name === 'surah' && route.number === 1 && (
        <FatihaWordView onBack={goBack} />
      )}

      {route.name === 'surah' && route.number !== 1 && (
        <SurahWordView number={route.number} onBack={goBack} />
      )}
    </div>
  );
}
