

import { appStateType } from "./types";

export const getAuthData = (state: appStateType) => state.mainReducer.authData;
export const getLoadingStatus = (state: appStateType) => state.mainReducer.isLoading;
export const getErrorMessage = (state: appStateType) => state.mainReducer.error;
export const getAllUsersList = (state: appStateType) => state.communicationReducer.allUsersList;
export const getComList = (state: appStateType) => state.communicationReducer.communicationList;
export const getSelectedCommunication = (state: appStateType) => state.communicationReducer.selectedCommunicatin;
export const getActiveId = (state: appStateType) => state.communicationReducer?.selectedCommunicatin;
export const getMsg = (state: appStateType) => state.communicationReducer.selectedCommunicatin?.messages;
export const getComLoadingStatus = (state: appStateType) => state.communicationReducer.isLoading;





