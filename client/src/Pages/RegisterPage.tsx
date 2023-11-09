import React, {useState, useEffect} from 'react'
import '../Styles/login.css';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth, registerUser } from '../Store/reducers/authSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  const [message, setMessage] = useState<string>('');
  const { status, isLoading } = useAppSelector((state) => state.authSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice))

  const handleSubmit = () => {
    try {
      dispatch(registerUser({username, password, email, name}))
      setEmail('')
      setName('')
      setPassword('')
      setUsername('')
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    if (status) {
      setMessage(status)

      const clearMessage = setInterval(() => {setMessage('')}, 3000)
      return () => { clearInterval(clearMessage)}
    }
  },[status])

  useEffect(() => {
    if(isAuth) {
      navigate('/dashboard')
    }
  },[dispatch, handleSubmit])

  return (
    <div className='register'>
      <div className='login_container'>
        <form className='registerform' onSubmit={e => e.preventDefault()}>
          <div className='login_label'>
          <h2>Имя пользователя</h2>
            <input 
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="loginline"></div>

          <div className='login_label'>
          <h2>Почта</h2>
            <input 
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="loginline"></div>

          <div className='login_label'>
          <h2>Пароль</h2>
          <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </div>

          <div className="loginline"></div>

          <div className='login_label'>
          <h2>Ваше имя</h2>
          <input 
              type='text'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="loginline"></div>

          <button className='loginbut' type='submit' onClick={handleSubmit}>Регистрация</button>
        </form>

        <div className="loginline"></div>

        <div className='login_label_sub'>
          <h2>уже есть аккаунт?</h2>
          <a href='/login'>Войти</a>
        </div>

      </div>
      {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
      {message ? 
      <div className='message_container'>
        <h2 className="message">{message}</h2>
      </div>
      :''}
    </div>
  )
}

export default RegisterPage
