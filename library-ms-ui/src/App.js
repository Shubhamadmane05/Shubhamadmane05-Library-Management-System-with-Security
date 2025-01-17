import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import ViewBooks from './components/ViewBooks';
import ManageBooks from './components/ManageBooks';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/viewBooks" element={<ViewBooks />} />
      <Route path="/manageBooks" element={<ManageBooks />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
