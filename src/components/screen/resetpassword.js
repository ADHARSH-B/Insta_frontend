import React,{ useState } from "react"
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom" 
import M from "materialize-css"

const Signin= Props=>{
    const[email,setemail]=useState("")
    const postData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html: "Invalid Email",classes: 'rounded red'})
        }
        fetch("https://instabackapi.herokuapp.com/resetpassword",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            console.log(data)
              if(data.error){
                M.toast({html: data.error,classes: 'rounded red'})
              }
              else{
                  M.toast({html:data.message,classes: 'rounded green'})
                  Props.history.push("/signin")
              }
        }).catch(err=>console.log(err))
    }
    return(
        <div className="mycard  ">
        <div className="card card_auth">
             <h2  class="brand-log ">Instagram</h2>
            <input type="email" name="email" placeholder="Email"  value={email} onChange={e=>setemail(e.target.value)} autoComplete/>
            <Button variant="contained" color="primary" onClick={()=>postData()}>ResetPassword</Button>
        </div>
    </div>
    )
}

export default Signin