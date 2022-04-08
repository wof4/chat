import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComDataTc, sendNewMessageTc, setSelectedUserTc } from '../../../redux/reducers/communicationReducer';
import { getDialogsList, getSelectedUser, getAuthData, getAllUsersList, getUserListStatus } from '../../../selectors';
import UsersLists from '../../pagesComponents/UsersLists/UsersLists';
import MessageBoard from '../../pagesComponents/messages/MessageBord';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import s from './chat-page.module.css';
import NewMessageField from '../../pagesComponents/messageField/NewMessageField';
import { setShowUsersListStatusTc } from '../../../redux/reducers/mainReducer';


const ChatPage = () => {
  const dispatch = useDispatch()
  const dialogList = useSelector(getDialogsList);
  const allUsersList = useSelector(getAllUsersList);
  const currentUser = useSelector(getSelectedUser);
  const authData = useSelector(getAuthData);
  const userListStatus = useSelector(getUserListStatus)

  const selectedUser = currentUser && dialogList ? dialogList.filter(item => item._id === currentUser)[0] : null
  const { _id, name } = authData


  const [userData, setUserData] = useState(selectedUser)


  useEffect(() => {
    setUserData(selectedUser)
  }, [selectedUser])

  useEffect(() => {
    if (authData._id) {
      dispatch(getComDataTc(authData._id))
    }
  }, [])

  const closeDialog = () => {
    dispatch(setSelectedUserTc(null))
    dispatch(setShowUsersListStatusTc(true))
  }
  const showUsersList = () => {
    dispatch(setShowUsersListStatusTc(userListStatus !== true))
  }

  const addProgressMessage = () => {
    let keys = Object.keys(localStorage)

    for (let key of keys) {
      const progressItem = JSON.parse(String(localStorage.getItem(key)))
      if (progressItem.user === userData._id) {
        if (userData.messages) {
          setUserData({ ...userData, messages: [...userData.messages, progressItem.message] })
        } else {
          setUserData({ ...userData, messages: [progressItem.message] })
        }
      }
    }
  }


  return (
    <div className={s.wrapper}>
      <UsersLists
        userListStatus={userListStatus}
        dialogList={dialogList}
        allUsersList={allUsersList}
        showUsersList={showUsersList}
      />
      {userData &&
        <div className={s.dialog_container}>
          <div className={s.buttons_container}>
            <div className={s.button_arrows}>
              <IconButton onClick={() => showUsersList()}>
                <CompareArrowsIcon color="success" fontSize='large' />
              </IconButton>
            </div>
            <IconButton onClick={() => closeDialog()}>
              <CancelIcon color="warning" fontSize='large' />
            </IconButton>
          </div>
          <MessageBoard
            selectedUser={userData}
            authData={authData}
          />
          <NewMessageField
            _id={_id}
            name={name}
            selectedUser={userData}
            addProgressMessage={addProgressMessage}
          />
        </div>
      }
    </div>
  );
};

export default ChatPage;
