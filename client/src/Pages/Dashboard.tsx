import {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { getMe, logout, updateEmail, updateName, updateUsername } from '../Store/reducers/authSlice';
import '../Styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, status } = useAppSelector((state) => state.authSlice);
  const user = useAppSelector((state) => state.authSlice.user);

  useEffect(() => {
    dispatch(getMe())
  },[dispatch])

  const [daysSinceRegistration, setDaysSinceRegistration] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>('')

  useEffect(() => {
    if (status) {
      setMessage(status);

      const clearMessage = setInterval(() => {
        setMessage('');
      }, 3000);
      return () => {
        clearInterval(clearMessage);
      };
    }

  }, [status, navigate]);

  useEffect(() => {
    dispatch(getMe());

    if (user && user.createdAt) {
      const createdAtDate = new Date(user.createdAt);
      const currentDate = new Date();

      const timeDifference = Math.abs(currentDate.getTime() - createdAtDate.getTime());
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      setDaysSinceRegistration(daysDifference);
    }
  }, [dispatch, user?.createdAt]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  }

  const horizontalLineRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !animationTriggered) {
                  entry.target.classList.add("nice_appearance");
                  setAnimationTriggered(true);
              }
          });
      }, { threshold: 0.5 });

      if (horizontalLineRef.current) {
          observer.observe(horizontalLineRef.current);
      }

      return () => {
          if (horizontalLineRef.current) {
              observer.unobserve(horizontalLineRef.current);
          }
      };
  }, [animationTriggered]);

  //NameChange
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState<string>(user?.name || '');

  const handleNameChange = (value: string) => {
    setNewName(value);
  };

  const handleSaveName = () => {
    dispatch(updateName(newName))
    setIsEditingName(false);
  }

  const handleEditName = () => {
    setIsEditingName(true);
  };
  
  const handleCancelEditName = () => {
    setIsEditingName(false);
  };

  //newEmail
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState<string>(user?.email || '');

  const handleEmailChange = (value: string) => {
    setNewEmail(value);
  };

  const handleSaveEmail = () => {
    dispatch(updateEmail(newEmail))
    setIsEditingEmail(false);
  }

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };
  
  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
  };

  //newUserUsername
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState<string>(user?.username || '');

  const handleUsernameChange = (value: string) => {
    setNewUsername(value);
  };

  const handleSaveUsername = () => {
    dispatch(updateUsername(newUsername))
    setIsEditingUsername(false);
  }

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };
  
  const handleCancelEditUsername = () => {
    setIsEditingUsername(false);
  };

  const isActivated = useAppSelector((state) => state.authSlice.user?.isActivated || false);

  return (
    <div className='dashboard'>
      <div>
        {user && (
          <div className='userinfo'>

            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
                {isActivated ? (
                  <h4>Активировано</h4>
                ) : (
                  <h5>Не активировано</h5>
                )}
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>            

            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
              {isEditingName ? (
                <h2>
                  <span>Имя : </span>
                  <input 
                    type='text'
                    value={newName}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                  <button className='cancelbut' onClick={handleCancelEditName}>✖</button>
                  <button className='confirmbut' onClick={handleSaveName}>✔</button>
                </h2>
              ) : (
                <h2>
                  <span>Имя : </span>{user.name}
                  <button className='changebut' onClick={handleEditName}>Change</button>
                </h2>
              )}
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>

            
            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
              {isEditingUsername ? (
                <h2>
                  <span>UserName : </span>
                  <input 
                    type='text'
                    value={newUsername}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                  />
                  <button className='cancelbut' onClick={handleCancelEditUsername}>✖</button>
                  <button className='confirmbut' onClick={handleSaveUsername}>✔</button>
                </h2>
              ) : (
                <h2>
                  <span>Username : </span>{user.username}
                  <button className='changebut' onClick={handleEditUsername}>Change</button>
                </h2>
              )}
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>

            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
              {isEditingEmail ? (
                <h2>
                  <span>Почта : </span>
                  <input 
                    type='text'
                    value={newEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                  <button className='cancelbut' onClick={handleCancelEditEmail}>✖</button>
                  <button className='confirmbut' onClick={handleSaveEmail}>✔</button>
                </h2>
              ) : (
                <h2>
                  <span>Почта : </span>{user.email}
                  <button className='changebut' onClick={handleEditEmail}>Change</button>
                </h2>
              )}
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>

            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
              <h2><span>Дней на проекте : </span>{daysSinceRegistration}</h2>
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>

            <div className='namesection' ref={horizontalLineRef}>
              <div className='nameline_left'></div>
              <h2><span>Курсы в наличии : </span>{user.purchasedCourses.length}</h2>
              <div className='nameline_right'></div>
            </div>
            <div className='nameline_high'></div>

          </div>
        )}
      </div>
      <button className='logout' onClick={handleLogout}>выйти</button>
      {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
      {message ? 
      <div className='message_container'>
        <h2 className="message">{message}</h2>
      </div>
      :''}
    </div>
  )
}

export default Dashboard
