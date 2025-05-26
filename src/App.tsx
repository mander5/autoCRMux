import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage'; // Make sure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:slug' element={<ProjectDetailPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
