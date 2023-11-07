import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { activateAccount } from '../Store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../Store/hoocs';

const ActivationPage: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (link) {
        dispatch(activateAccount(link))
    }
  },[dispatch, link])


  return (
    <div className='activate'>
        <h2>Ваш аккаунт успешно активирован!</h2>
        <h3>Перейти к <a href='/dashboard'>профилю</a></h3>
    </div>
  );
};

export default ActivationPage;