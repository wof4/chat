import MainApi from '../../api/mainApi';
import { AuthDataType, BaseThunkType, InferActionsTypes } from '../../types';

type initialStateType = {
    authData: any
    isLoading: boolean
    error: any
    userListStatus: boolean
}

const initialState: initialStateType = {
    authData: null,
    isLoading: false,
    error: null,
    userListStatus: true,
};

const mainReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'SET_AUTH_DATA': {
            return { ...state, authData: action.payload };
        }
        case 'SET_ERROR': {
            return { ...state, error: action.payload };
        }
        case 'SET_LOADING_STATUS': {
            return { ...state, isLoading: action.payload };
        }
        case 'SET_USER_LIST_STATUS': {
            return { ...state, userListStatus: action.payload };
        }

        default: {
            return state;
        }
    }
};

export const actions = {
    setAuthData: (payload: any) => ({ type: 'SET_AUTH_DATA', payload } as const),
    setError: (payload: any) => ({ type: 'SET_ERROR', payload } as const),
    setLoadingStatus: (payload: any) => ({ type: 'SET_LOADING_STATUS', payload } as const),
    setUsersListStatus: (payload: any) => ({ type: 'SET_USER_LIST_STATUS', payload } as const),
};

export const loginUserTc = (data: AuthDataType): thunkType => (dispatch) => {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setError(null))
    MainApi.login(data).then((res) => {
        if (res.statusCode === 404) {
            dispatch(actions.setError(res.message))
        } else {
            dispatch(actions.setAuthData(res.user))
        }
        dispatch(actions.setLoadingStatus(false))
    })
}
export const registerUserTc = (data: AuthDataType): thunkType => (dispatch) => {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setError(null))
    MainApi.register(data).then((res) => {
        if (res.statusCode === 400) {

            dispatch(actions.setError(res.message))
        } else {
            dispatch(actions.setAuthData(res.user))
        }
        dispatch(actions.setLoadingStatus(false))
    })
}



export const setShowUsersListStatusTc = (status: boolean): thunkType => (dispatch) => {
    dispatch(actions.setUsersListStatus(status))
}



export default mainReducer;


type actionsType = InferActionsTypes<typeof actions | typeof actions>
type thunkType = BaseThunkType<actionsType>