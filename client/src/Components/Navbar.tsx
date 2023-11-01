import React from 'react'
import '../Styles/navbar.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { checkIsAuth, logout } from '../Store/reducers/authSlice';

const Navbar = () => {
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice))
  const dispatch = useAppDispatch();

  return (
    <div className='navbar'>
      <div>
        <a href='/'>LOGO</a>
      </div>

      <div className='navbar_right'>
        <a>БЛОГ</a>
        <a href='/courses'>КУРСЫ</a>
        {isAuth ? <a href='/dashboard'>ПАНЕЛЬ УПРАВЛЕНИЯ</a> : <a href='/login'>ВОЙТИ</a>}
      </div>
    </div>
  )
}

export default Navbar
