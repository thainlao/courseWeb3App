import React, {useState, useEffect} from 'react'
import '../Styles/login.css';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from '../Store/reducers/authSlice';

const LoginPage = () => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, isLoading } = useAppSelector((state) => state.authSlice);
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice))

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

  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({password, email}))
      setEmail('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if(isAuth) {
      navigate('/dashboard')
    }
  },[dispatch, handleSubmit])

  return (
    <div className='login'>
      <div className='login_container'>

        <form className='loginform' onSubmit={e => e.preventDefault()}>
          <div className='login_label'>
          <h2>Введите Логин</h2>
            <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type='text'/>
          </div>

          <div className="loginline"></div>

          <div className='login_label'>
            <h2>Введите Пароль</h2>
            <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          </div>

          <div className="loginline"></div>

          <button className='loginbut' type='submit' onClick={handleSubmit}>Войти</button>
          <a href='/reset-password'>Забыли пароль?</a>
        </form>

        <div className="loginline"></div>

        <div className='login_label_sub'>
          <h2>нет аккаунта?</h2>
          <a href='/registration'>Создать аккаунт</a>
        </div>

      </div>
      {message ? 
      <div className='message_container'>
        <h2 className="message">{message}</h2>
      </div>
      :''}
      {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
    </div>
  )
}

export default LoginPage
