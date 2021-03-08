import React,{ useState,useContext } from "react"
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom" 
import M from "materialize-css"
import { UserContext } from "../../App"
const Signin= Props=>{
    const[password,setpassword]=useState("")
    const[email,setemail]=useState("")
    const { state,dispatch } = useContext(UserContext)
    const postData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html: "Invalid Email",classes: 'rounded red'})
        }
        fetch("https://instabackapi.herokuapp.com/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
              if(data.error){
                M.toast({html: data.error,classes: 'rounded red'})
              }
              else{
                  localStorage.setItem("jwt",data.token)
                  localStorage.setItem("user",JSON.stringify(data.user))
                  console.log(data.user)
                  dispatch({type:"USER",payload:data.user})
                  M.toast({html:data.message,classes: 'rounded green'})
                  Props.history.push("/")
              }
        }).catch(err=>console.log(err))
    }
    return(
        <div className="mycard  ">
        <div className="card card_auth">
             <h2  class="brand-log ">Instagram</h2>
            <input type="email" name="email" placeholder="Email"  value={email} onChange={e=>setemail(e.target.value)} autoComplete/>
            <input type="password" name="password" placeholder="Password" onChange={e=>setpassword(e.target.value)} autoComplete/>
            <Button variant="contained" color="primary" onClick={()=>postData()}>Login</Button>
            <Link to="/resetpassword"> <h5>Forgot Password..?  </h5></Link> 
            <h5>Dont Have An Account ? <Link to="/signup"> <Button variant="contained" color="primary">Signup</Button></Link> </h5>
        </div>
    </div>
    )
}

export default Signin