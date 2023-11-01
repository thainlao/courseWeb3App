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
      <div className='register_container'>
        <form className='registerform' onSubmit={e => e.preventDefault()}>
          <label className='login_label'>
            <input 
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className='login_label'>
            <input 
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className='login_label'>
          <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </label>

          <label className='login_label'>
          <input 
              type='text'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button type='submit' onClick={handleSubmit}>Регистрация</button>
        </form>

        <div>
          <h2>уже есть аккаунт?</h2>
          <a href='/login'>Войти</a>
        </div>

      </div>
      {isLoading ? <h2>loading</h2> : ''}
      {message ? <h2>{message}</h2> : ''}
    </div>
  )
}

export default RegisterPage
