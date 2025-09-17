import "./Layout.css"

const Layout = ({ setLogin }: any) => {
  return (
    <>
      <div className='nav-bar'>
        <div className='logo'>LOGO</div>
        <div className='login-btn' onClick={() => setLogin(true)}>Login</div>
    </div >
      <div className='footer'></div>
    </>
  )
}

export default Layout