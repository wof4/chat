

import { appStateType } from "./types";

export const getAuthData = (state: appStateType) => state.mainReducer.authData;
export const getLoadingStatus = (state: appStateType) => state.mainReducer.isLoading;
export const getErrorMessage = (state: appStateType) => state.mainReducer.error;
export const getIsComOpen = (state: appStateType) => state.mainReducer.isComOpen;
export const getAllUsersList = (state: appStateType) => state.communicationReducer.allUsersList;
export const getComList = (state: appStateType) => state.communicationReducer.communicationList;
export const getSelectedUser = (state: appStateType) => state.communicationReducer.selectedUser;
export const getActiveId = (state: appStateType) => state.communicationReducer?.selectedUser;
export const getMsg = (state: appStateType) => state.communicationReducer.selectedUser?.messages;
export const getComLoadingStatus = (state: appStateType) => state.communicationReducer.isLoading;





