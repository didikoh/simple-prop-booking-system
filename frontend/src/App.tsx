import { useState } from 'react';
import './App.css'
import BookingContainer from './page/BookingContainer'
import Layout from './layouts/Layout'
import LoginForm from './components/auth/LoginForm';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './page/AdminPage';
import Landing from './page/Landing';
import { useAppContext } from './context/AppContext';
import LoadingSpinner from './components/loading/LoadingSpinner';

function App() {
  const { loadingSpinner } = useAppContext();
  const [login, setLogin] = useState(false);

  return (
    <>
      <Layout setLogin={setLogin} />
      {login && <LoginForm setLogin={setLogin} />}
      {loadingSpinner && <LoadingSpinner />}
      <Routes>
        <Route path="/" element={<Landing setLogin={setLogin} />} />
        <Route path="/booking" element={<BookingContainer />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
