import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUserTc, addSelectedUserInDialogListTc } from '../../../redux/reducers/communicationReducer';
import { getDialogsIsLoading } from '../../../selectors';
import Tabs from '../tabs/Tabs';
import s from './communicationList.module.css';


const UsersLists = (props) => {

    const dispatch = useDispatch()
    const isLoading = useSelector(getDialogsIsLoading)
    const { dialogList, allUsersList, userListStatus, showUsersList } = props
    const tabsRef = useRef(null)
    const [tabsWidth, setTabsWidth] = useState(null)

    useEffect(() => {
        setTabsWidth(tabsRef.current.offsetWidth)
    });
    const setSelectedUser = (user) => {
        if (user) {
            const includeUserInDialogList = dialogList.filter((item) => item._id === user._id).length > 0
            if (includeUserInDialogList) {
                dispatch(setSelectedUserTc(user._id))
                if (window.innerWidth <= 668) {
                    showUsersList(false)
                }

            } else {
                dispatch(addSelectedUserInDialogListTc(user))
                dispatch(setSelectedUserTc(user._id))
                if (window.innerWidth <= 668) {
                    showUsersList(false)
                }
            }
        } else {
            dispatch(setSelectedUserTc(null))
        }
    }

    return (
        <div ref={tabsRef} className={s.wrapper} style={{ marginLeft: (userListStatus) ? '8px' : `-${tabsWidth}px` }}>
            <Tabs setSelectedUser={setSelectedUser} dialogList={dialogList} allUsersList={allUsersList} isLoading={isLoading} />
        </div>
    );
};

export default UsersLists;
