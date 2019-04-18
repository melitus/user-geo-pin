
export default function reducer(state, action){
    switch(type.action){
        case "LOGIN_USER":
        return {
            ...state,
            currentUser:action.payload
        }
        default:
        return state
    }
}