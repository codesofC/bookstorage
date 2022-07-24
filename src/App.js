import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddBook from './containers/AddBook';
import SearchBooks from './containers/SearchBooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<AddBook />} />
          <Route path='/search' element={<SearchBooks />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
