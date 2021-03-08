import React,{ useState } from "react"
import { useParams } from "react-router-dom"
import Button from '@material-ui/core/Button';
import M from "materialize-css"

const Signin= Props=>{
    const[password,setpassword]=useState("")
    const token = useParams()
    const postData=()=>{
        fetch("https://instabackapi.herokuapp.com/newpassword",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                token:token
            })
        }).then(res=>res.json()).then(data=>{
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
            <input type="password" name="password" placeholder="password"  value={password} onChange={e=>setpassword(e.target.value)} autoComplete/>
            <Button variant="contained" color="primary" onClick={()=>postData()}>UpdatePassword</Button>
        </div>
    </div>
    )
}

export default Signin