import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import NewReport from './NewReport';
import ListReports from './ListReports';
import HomePage from './HomePage';

function App() {
  return (
      <Router>
        <div className="App">
          <NavBar />
            <Routes>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/new-report" element={<NewReport />} />
                <Route path="/list-reports" element={<ListReports />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
