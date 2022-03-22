
import { actions as comActions, getComDataTc } from "../redux/reducers/communicationReducer";
import { actions as mainActions } from "../redux/reducers/mainReducer";
import socket from "./socket";

let dis: any = null
export const ResiveSocket = {
    addDispatch: (dispatch: any) => {
        dis = dispatch
    }
}

socket.on('new-message', (id) => {
    dis(getComDataTc(id))
})

socket.on('send-error', (message) => {
    console.log(message);
    dis(mainActions.setError(message))
})
socket.on('update-messages-status', (id) => {
    dis(getComDataTc(id))
})