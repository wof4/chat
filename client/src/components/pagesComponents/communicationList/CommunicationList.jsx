import React from 'react';
import { useDispatch } from 'react-redux';
import s from './communicationList.module.css';
import { setSelectedUserTc } from '../../../redux/reducers/communicationReducer';
import Tabs from '../tabs/Tabs';



const CommunicationList = (props) => {

    const dispatch = useDispatch()
    const { comList, allUsersList, isComOpen } = props

    const setCurrentCommunication = (item) => {
        if (item) {
            dispatch(setSelectedUserTc(item._id))
        } else {
            dispatch(setSelectedUserTc(null))
        }
    }

    return (
        <div className={s.wrapper} style={{ marginLeft: (isComOpen) ? '0' : '-30%', minWidth: '30%' }}>
            <Tabs setCurrentCommunication={setCurrentCommunication} comList={comList} allUsersList={allUsersList} />
        </div>
    );
};

export default CommunicationList;
