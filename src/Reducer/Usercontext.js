export const initialstate = null

export const reducer = (state,action)=>{
    if(action.type === "USER"){
        return {
           ... action.payload,
        }
    }
    if(action.type === "LOGOUT"){
        return null
    }
    if(action.type === "UPDATE"){
        return{
            ...state,
            followers:action.payload.followers,
            following:action.payload.following
        }
    }
    console.log("reducers state", state)
     return state
}