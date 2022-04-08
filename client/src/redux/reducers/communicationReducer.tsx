import CommunicationApi from '../../api/CommunicationApi';
import { ResiveSocket } from '../../api/socketsResive';
import SendSocket from '../../api/socketsSend';
import { BaseThunkType, InferActionsTypes, DialogType, NewMessageData } from '../../types';

type initialStateType = {
    dialogsList: Array<DialogType>
    allUsersList: Array<any>
    selectedUser: null | DialogType
    progressMessages: Array<any>
    isLoading: boolean

}

const initialState: initialStateType = {
    dialogsList: [],
    allUsersList: [],
    selectedUser: null,
    progressMessages: [],
    isLoading: true
};

const communicationReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'SET_DIALOGS_LIST': {
            return { ...state, dialogsList: [...action.payload] };
        }
        case 'SET_LOADIND_STATUS': {
            return { ...state, isLoading: action.payload };
        }
        case 'SET_SELECTED_USER': {
            return { ...state, selectedUser: action.payload };
        }
        case 'SET_ALL_USERS': {
            return { ...state, allUsersList: [...action.payload] };
        }
        case 'ADD_DIALOG_USER': {
            return { ...state, dialogsList: [...state.dialogsList, action.payload] };
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    setNewsMessage: (payload: string) => ({ type: 'SET_NEWS_MESSAGE', payload } as const),
    setDialogsLists: (payload: Array<any>) => ({ type: 'SET_DIALOGS_LIST', payload } as const),
    setSelectedUser: (payload: DialogType) => ({ type: 'SET_SELECTED_USER', payload } as const),
    setAllUsers: (payload: any) => ({ type: 'SET_ALL_USERS', payload } as const),
    addDialogUser: (payload: any) => ({ type: 'ADD_DIALOG_USER', payload } as const),
    setLoadingStatus: (payload: any) => ({ type: 'SET_LOADIND_STATUS', payload } as const),
};

export const sendNewMessageTc = (messageData: NewMessageData): thunkType => (dispatch) => {
    SendSocket.sendNewMessage(messageData)
};
export const updateNewMessagesStatusTc = (userId: string, dialogId: string): thunkType => (dispatch) => {
    SendSocket.updateNewMessagesStatus(userId, dialogId)
};

export const setSelectedUserTc = (value: DialogType): thunkType => (dispatch) => {
    dispatch(actions.setSelectedUser(value))
};
export const addSelectedUserInDialogListTc = (user: DialogType): thunkType => (dispatch) => {
    dispatch(actions.addDialogUser(user))
};

export const getComDataTc = (autorId: string): thunkType => (dispatch) => {

    CommunicationApi.getComData(autorId).then((res) => {
        if (res.statusCode !== 200) {
            console.log(res)
        } else {
            SendSocket.sendMySocketId(autorId)
            dispatch(actions.setAllUsers(res.data.allUsers))
            if (res.data.comList) {
                dispatch(actions.setDialogsLists(res.data.comList))
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


