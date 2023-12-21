import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Home, NotFound } from './pages';

const App = () => {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
