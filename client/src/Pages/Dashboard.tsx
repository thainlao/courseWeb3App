import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { checkIsAuth, getMe, logout } from '../Store/reducers/authSlice';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.authSlice);
  const user = useAppSelector((state) => state.authSlice.user);

  useEffect(() => {
    dispatch(getMe())
  },[dispatch])

  const [daysSinceRegistration, setDaysSinceRegistration] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getMe());

    if (user && user.createdAt) {
      const createdAtDate = new Date(user.createdAt);
      const currentDate = new Date();

      const timeDifference = Math.abs(currentDate.getTime() - createdAtDate.getTime());
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      setDaysSinceRegistration(daysDifference);
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <div>
        <button onClick={handleLogout}>выйти</button>
        {user && (
          <div className='userinfo'>
            <h2>Имя: {user.name}</h2>
            <h2>Почта: {user.email}</h2>
            <h2>Имя пользователя: {user.username}</h2>
            <h2>Выпонено достижений: {user.achievements.length}</h2>
            <h2>Количество дней на проекте: {daysSinceRegistration}</h2>

            <div className='userimg_section'>
              <div className='userimg'><p>{user.name}</p></div>
              <h2>{user.email}</h2>
              <h2>Студент</h2>
            </div>
          </div>
        )}
      </div>
      {isLoading ? <p>Loading</p> : ''}
    </div>
  )
}

export default Dashboard
