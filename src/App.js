import React,{useEffect,createContext,useReducer} from 'react';
import './App.css';
import { initialstate,reducer } from "./Reducer/Usercontext"
import Navbar from "./components/navigation/navbar"
import Home from "./components/screen/Home"
import Profile from "./components/screen/profile"
import Signin from "./components/screen/signin"
import Signup from "./components/screen/signup"
import Createpost from "./components/screen/createpost"
import Userprofile from "./components/screen/Userprofile"
import followingpost from "./components/screen/followingpost"
import Resetpassword from "./components/screen/resetpassword"
import newpassword from "./components/screen/newpassword"
import { Route , withRouter} from "react-router-dom"

export const UserContext = createContext()

const App = props=> {
  useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("user"))
   if(user){
     dispatch({type:"USER",payload:user})
   }
   else{
     if(!props.history.location.pathname.startsWith("/reset")){
      props.history.push("/signin")
     }
   }
  },[])
  const[ state,dispatch ] = useReducer( reducer,initialstate)
  console.log(state)
  
  return (
    <>
    
    <div className = "app">
      <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <Navbar/>
      <Route path ="/" exact component={Home}/>
      <Route path ="/createpost"  component={Createpost}/>
      <Route path ="/signin"  component={Signin}/>
      <Route path ="/signup"  component={Signup}/>
      <Route exact path ="/profile"  component={Profile}/>
      <Route path="/profile/:userid" component={Userprofile}/>
      <Route path="/followingpost" component={followingpost}/>
      <Route exact path="/resetpassword" component={Resetpassword}/>
      <Route path="/reset/:token" component={newpassword}/>
      </UserContext.Provider>
      </div>
      </>
  );
   
}



export default withRouter(App);
