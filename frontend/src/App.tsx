import { useState } from 'react';
import './App.css'
import BookingContainer from './components/BookingContainer'
import Layout from './layouts/Layout'
import LoginForm from './components/auth/LoginForm';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <Layout setLogin={setLogin} />
      <BookingContainer />
      {login && <LoginForm setLogin={setLogin}/>}
    </>
  )
}

export default App
