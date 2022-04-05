import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComDataTc, sendNewMessageTc, setSelectedCommunicationTc } from '../../../redux/reducers/communicationReducer';
import { getComList, getSelectedCommunication, getAuthData, getAllUsersList, getIsComOpen } from '../../../selectors';
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
  const selectedCommunication = useSelector(getSelectedCommunication);
  const authData = useSelector(getAuthData);
  const isComOpen = useSelector(getIsComOpen)

  const selectedUser = selectedCommunication && comList ? comList.filter(item => item._id === selectedCommunication)[0] : null


  useEffect(() => {
    if (authData._id) {
      dispatch(getComDataTc(authData._id))
    }
  }, [])


  const [currentValue, setCurrentValue] = useState('')
  const { _id, name } = authData

  const handleClose = () => {
    dispatch(setSelectedCommunicationTc(null))
  }
  const handleComOpen = () => {
    dispatch(setisComOpenTc(isComOpen !== true))
  }



  const sendMessage = (value: any) => {
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
      <CommunicationList isComOpen={isComOpen} authData={authData} comList={comList} allUsersList={allUsersList} />
      {selectedUser &&

        <div className={s.messages}>

          <div className={s.buttons}>
            <IconButton
              onClick={() => handleComOpen()}
            >
              <CompareArrowsIcon color="success" fontSize='large' />
            </IconButton>
            <IconButton
              onClick={() => handleClose()}
            >
              <CancelIcon color="warning" fontSize='large' />
            </IconButton>
          </div>
          <MessageBoard comList={comList} selectedCommunication={selectedUser} />
          <NewMessageField sendMessage={sendMessage} setCurrentValue={setCurrentValue} value={currentValue} />


        </div>
      }

    </div>
  );
};

export default ChatPage;
