import CommunicationApi from '../../api/CommunicationApi';
import { ResiveSocket } from '../../api/socketsResive';
import SendSocket from '../../api/socketsSend';
import { BaseThunkType, InferActionsTypes, CommunicationType, NewMessageData } from '../../types';

type initialStateType = {
    communicationList: Array<CommunicationType>
    allUsersList: Array<any>
    selectedCommunicatin: null | CommunicationType
    progressMessages: Array<any>
    isLoading: boolean

}

const initialState: initialStateType = {
    communicationList: [],
    allUsersList: [],
    selectedCommunicatin: null,
    progressMessages: [],
    isLoading: true
};

const communicationReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'SET_COMMUNICATION_LIST': {
            return { ...state, communicationList: [...action.payload] };
        }
        case 'SET_LOADIND_STATUS': {
            return { ...state, isLoading: action.payload };
        }
        case 'SET_SELECTED_COMMUNICATION': {
            return { ...state, selectedCommunicatin: action.payload };
        }
        case 'SET_ALL_USERS': {
            return { ...state, allUsersList: [...action.payload] };
        }
        case 'ADD_COMMUNICATION_USER': {
            return { ...state, communicationList: [...state.communicationList, action.payload] };
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    setNewsMessage: (payload: string) => ({ type: 'SET_NEWS_MESSAGE', payload } as const),
    setCommunicationLists: (payload: Array<any>) => ({ type: 'SET_COMMUNICATION_LIST', payload } as const),
    setSelectedCommunication: (payload: CommunicationType) => ({ type: 'SET_SELECTED_COMMUNICATION', payload } as const),
    setAllUsers: (payload: any) => ({ type: 'SET_ALL_USERS', payload } as const),
    addCommunicationUser: (payload: any) => ({ type: 'ADD_COMMUNICATION_USER', payload } as const),
    setLoadingStatus: (payload: any) => ({ type: 'SET_LOADIND_STATUS', payload } as const),
};

export const sendNewMessageTc = (messageData: NewMessageData): thunkType => (dispatch) => {
    SendSocket.sendNewMessage(messageData)
};
export const updateNewMessagesStatusTc = (userId: string, dialogId: string): thunkType => (dispatch) => {
    SendSocket.updateNewMessagesStatus(userId, dialogId)
};

export const setSelectedCommunicationTc = (value: CommunicationType): thunkType => (dispatch) => {
    dispatch(actions.setSelectedCommunication(value))
};
export const addCurrentCommunicationTc = (user: CommunicationType): thunkType => (dispatch) => {
    dispatch(actions.addCommunicationUser(user))
};

export const getComDataTc = (autorId: string): thunkType => (dispatch) => {

    CommunicationApi.getComData(autorId).then((res) => {
        if (res.statusCode !== 200) {
            console.log(res)
        } else {
            SendSocket.sendMySocketId(autorId)
            dispatch(actions.setAllUsers(res.data.allUsers))
            if (res.data.comList) {
                dispatch(actions.setCommunicationLists(res.data.comList))
                dispatch(actions.setLoadingStatus(false))

            }
        }
    })
}



export const startListeningTc = (): thunkType => (dispatch) => {
    ResiveSocket.addDispatch(dispatch)
};




export default communicationReducer;

type actionsType = InferActionsTypes<typeof actions | typeof actions>
type thunkType = BaseThunkType<actionsType>


