import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startListeningTc } from '../../../redux/reducers/communicationReducer';
import { getAuthData, getErrorMessage } from '../../../selectors';
import CustomAlert from '../../pagesComponents/alert/CustomAlert';
import Header from '../../pagesComponents/header/Header';
import Chat from '../chat/Chat';
import ChatPage from '../chat/chatPage';
import LoginPage from '../login/LoginPage';

import s from './main-page.module.css';


const MainPage = () => {
  const authData = useSelector(getAuthData);
  const errorMessage = useSelector(getErrorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startListeningTc())
  }, []);

  return (
    <div className={s.wrapper}>
      {errorMessage && <CustomAlert text={errorMessage} />}
      {authData && <Header />}
      {authData ? <ChatPage /> : <LoginPage />}
    </div>
  );
};

export default MainPage;
