import AlertReducer from './alertReducer'
import AlertContext from './alerContext'

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'
import { useReducer } from 'react'

const AlertState = props => {
    const initialState = {
        alert:null,
    }    
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    const showAlert = (msg, type) => {
        setAlert({msg, type})
        setTimeout(() => {
            removeAlert()
        }, 3000);
    }
    const setAlert = ({msg, type})=> dispatch({
        type:SET_ALERT,
        payload:{msg, type},
    })
    const removeAlert = ()=>dispatch({
        type:REMOVE_ALERT,
    })

    
    return <AlertContext.Provider
        value={{
            alert:state.alert,
            showAlert,
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState