import React, { useState, useEffect } from "react";
import { resetPassword } from "../Store/reducers/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hoocs";
import '../Styles/reset.css';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [message, setMessage] = useState<string>('');
  const {status, isLoading} = useAppSelector((state) => state.authSlice)

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
  
    }, [status]);

  const handleResetPassword = async () => {
    try {
      const resultAction = await dispatch(resetPassword({ resetToken, newPassword }));

      if (resetPassword.fulfilled.match(resultAction)) {
        setMessage('all is good')
      } else {
        console.log("Ошибка при сбросе пароля", resultAction.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="reset">
      <h2>Введите свой новый пароль</h2>
      <div className="reset_container">
        <h2>Сброс пароля</h2>
        <input
          type="password"
          placeholder="Введите новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Сбросить пароль</button>
        {message ? <h2>{message}</h2> : ''}
        {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
      </div>
    </div>
  );
};

export default ResetPassword;