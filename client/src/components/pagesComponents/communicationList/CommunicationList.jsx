import React from 'react';
import { useDispatch } from 'react-redux';
import s from './communicationList.module.css';
import { setSelectedCommunicationTc } from '../../../redux/reducers/communicationReducer';
import Tabs from '../tabs/Tabs';



const CommunicationList = (props) => {

    const dispatch = useDispatch()
    const { comList, allUsersList, isComOpen } = props

    const setCurrentCommunication = (item) => {
        if (item) {
            dispatch(setSelectedCommunicationTc(item._id))
        } else {
            dispatch(setSelectedCommunicationTc(null))
        }
    }

    return (
        <div className={s.wrapper} style={{ marginLeft: (isComOpen) ? '0' : '-30%', minWidth: '30%' }}>
            <Tabs setCurrentCommunication={setCurrentCommunication} comList={comList} allUsersList={allUsersList} />
        </div>
    );
};

export default CommunicationList;
