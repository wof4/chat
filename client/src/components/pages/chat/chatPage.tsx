import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComDataTc, sendNewMessageTc, setSelectedUserTc } from '../../../redux/reducers/communicationReducer';
import { getComList, getSelectedUser, getAuthData, getAllUsersList, getIsComOpen } from '../../../selectors';
import CommunicationList from '../../pagesComponents/communicationList/CommunicationList';
import MessageBoard from '../../pagesComponents/messages/MessageBord';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import s from './chat-page.module.css';
import NewMessageField from '../../pagesComponents/messageField/NewMessageField';
import { newMessageCreator } from '../../pagesComponents/messages/message_utils';
import { setisComOpenTc } from '../../../redux/reducers/mainReducer';


const ChatPage = () => {

  const dispatch = useDispatch()
  const comList = useSelector(getComList);
  const allUsersList = useSelector(getAllUsersList);
  const currentUser = useSelector(getSelectedUser);
  const authData = useSelector(getAuthData);
  const isComOpen = useSelector(getIsComOpen)

  const selectedUser = currentUser && comList ? comList.filter(item => item._id === currentUser)[0] : null
  const { _id, name } = authData

  const [currentValue, setCurrentValue] = useState('')

  useEffect(() => {
    if (authData._id) {
      dispatch(getComDataTc(authData._id))
    }
  }, [])

  const closeDialog = () => {
    dispatch(setSelectedUserTc(null))
    dispatch(setisComOpenTc(true))
  }
  const showComList = () => {
    dispatch(setisComOpenTc(isComOpen !== true))
  }


  ////  переделать добавление сообщений из localstorage 

  const sendMessage = () => {
    const messageData = newMessageCreator({ currentValue, _id, name, selectedUser })
    let keys = Object.keys(localStorage);

    for (let key of keys) {
      const mes = localStorage.getItem(key)
      if (selectedUser.messages) {
        selectedUser.messages?.push(JSON.parse(String(mes)))
      } else {
        selectedUser.messages = [JSON.parse(String(mes))]
      }

    }
    dispatch(sendNewMessageTc(messageData))
    setCurrentValue('')
  }

  return (
    <div className={s.wrapper}>
      <CommunicationList
        selectedUser={selectedUser}
        isComOpen={isComOpen}
        authData={authData}
        comList={comList}
        allUsersList={allUsersList} />
      {selectedUser &&
        <div className={s.messages}>
          <div className={s.buttons}>
            <IconButton
              onClick={() => showComList()}
            >
              <CompareArrowsIcon color="success" fontSize='large' />
            </IconButton>
            <IconButton
              onClick={() => closeDialog()}
            >
              <CancelIcon color="warning" fontSize='large' />
            </IconButton>
          </div>
          <MessageBoard comList={comList} selectedUser={selectedUser} />
          <NewMessageField sendMessage={sendMessage} setCurrentValue={setCurrentValue} value={currentValue} />
        </div>
      }

    </div>
  );
};

export default ChatPage;
