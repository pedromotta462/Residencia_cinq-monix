import './App.css';
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Login from './pages/LoginPage';
import Success from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;