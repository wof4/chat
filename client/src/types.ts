import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { reducers } from "./redux/reduxStore"


export type MessageType = {
    autor: string
    autorId: number
    messageText: string
}

export type DialogType = {
    _id: number
    name: string
    messages: Array<MessageType>
} | any

export type AuthDataType = {
    name: string
    password: string
    socketId: string
}

export type LoginType = {
    name: string;
    password: string;
    showPassword: boolean;
}
export type NewMessageData = {
    messageText: string
    autorId: string
    autorName: string
    to: string
}

export type DataEnterType = {
    name: string
    password: string
  };


  export type UserDataType = {
    _id: string
    name: string
    password: string
    contacts:Array<string>
  };

  export type TouchedType = {
    name: boolean
    password: boolean
  };

  export type EventType = React.ChangeEvent<HTMLInputElement>
  export type MouseEventType = React.MouseEvent<HTMLButtonElement>



export type ActionsType = (payload: any) => { type: string; payload: any; }



// типизация для state
type reducersType = typeof reducers
export type appStateType = ReturnType<reducersType>

// типизация для action creators
type propertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {
    [key: string]
    : (...args: any[]) => any
}> = ReturnType<propertiesTypes<T>>

// типизация для thunc creators
export type BaseThunkType<A extends Action, R = void>
    = ThunkAction<R, appStateType, unknown, A>
