import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComDataTc } from '../../../redux/reducers/communicationReducer';
import { getComList, getSelectedCommunication, getAuthData, getAllUsersList } from '../../../selectors';
import CommunicationList from '../../pagesComponents/communicationList/CommunicationList';
import MessageBoard from '../../pagesComponents/messages/MessageBord';
import s from './chat-page.module.css';


const ChatPage = () => {

  const dispatch = useDispatch()
  const comList = useSelector(getComList);
  const allUsersList = useSelector(getAllUsersList);
  const selectedCommunication = useSelector(getSelectedCommunication);
  const authData = useSelector(getAuthData);

  const selectedUser = selectedCommunication && comList ? comList.filter(item => item._id === selectedCommunication)[0] : null


  useEffect(() => {
    if (authData._id) {
      dispatch(getComDataTc(authData._id))
    }
  }, [])



  return (
    <div className={s.wrapper}>
      <CommunicationList authData={authData} comList={comList} allUsersList={allUsersList} />
      {selectedUser && <MessageBoard comList={comList} selectedCommunication={selectedUser} />}

    </div>
  );
};

export default ChatPage;
