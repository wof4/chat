

import { appStateType } from "./types";

export const getAuthData = (state: appStateType) => state.mainReducer.authData;
export const getLoadingStatus = (state: appStateType) => state.mainReducer.isLoading;
export const getErrorMessage = (state: appStateType) => state.mainReducer.error;
export const getUserListStatus = (state: appStateType) => state.mainReducer.userListStatus;
export const getAllUsersList = (state: appStateType) => state.communicationReducer.allUsersList;
export const getDialogsList = (state: appStateType) => state.communicationReducer.dialogsList;
export const getSelectedUser = (state: appStateType) => state.communicationReducer.selectedUser;
export const getActiveId = (state: appStateType) => state.communicationReducer?.selectedUser;
export const getMsg = (state: appStateType) => state.communicationReducer.selectedUser?.messages;
export const getDialogsIsLoading = (state: appStateType) => state.communicationReducer.isLoading;





