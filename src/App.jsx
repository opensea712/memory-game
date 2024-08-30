import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Play from './pages/play';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='play' element={<Play />} />
        </Route>
      </Routes>
    </Router>
  );
}
