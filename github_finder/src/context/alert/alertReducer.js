import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

export default (state, action) =>{
    switch(action.type){
        case SET_ALERT:
            return {
                ...state,
                alert:{
                    msg:action.payload.msg,
                    type:action.payload.type,
                },
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alert:null,
            }
        default:
            return {
                state
            }
    }
}