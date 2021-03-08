import React,{ useState ,useEffect,useContext}from "react"
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
import M from "materialize-css"
import { UserContext } from "../../App"

const Signup = Props =>{
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const [image,setimage] = useState("")
    const { state,dispatch } = useContext(UserContext)
    const[url,seturl] = useState(undefined)
useEffect(()=>{
    if(url){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email",classes: 'rounded red'})
         }
         fetch("https://instabackapi.herokuapp.com/signup",{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 email:email,
                 password:password,
                 name:name,
                 pic:url
             })
         }).then(res=>res.json()).then(data=>{
               if(data.error){
                 M.toast({html: data.error,classes: 'rounded red'})
               }
               else{
                   M.toast({html:data.message,classes: 'rounded green'})
                   Props.history.push("/signin")
               }
         }).catch(err=>console.log(err))
    }
},[url])
const upload_image = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","adclouds")
    fetch("https://api.cloudinary.com/v1_1/adclouds/image/upload",{
        method:"POST",
        body:data
    }).then(res=>res.json()).then(
        data=>{
           seturl(data.url)
        })
}
const upload_fields = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return M.toast({html: "Invalid Email",classes: 'rounded red'})
     }
     fetch("https://instabackapi.herokuapp.com/signup",{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             email:email,
             password:password,
             name:name
         })
     }).then(res=>res.json()).then(data=>{
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

    const postData=()=>{
        if(image){
            upload_image()
        }
        else{
            upload_fields()
        }
    }
    return(
        <div className="mycard">
            <div className="card card_auth">
                 <h2  className="brand-log ">Instagram</h2>
                 <input type="text" name="name" placeholder="Name" autoComplete value={name} onChange={e=>setname(e.target.value)}/>
                <input type="email" name="email" placeholder="Email" autoComplete value={email} onChange={e=>setemail(e.target.value)}/>
                <input type="password" name="password" placeholder="Password" autoComplete value={password} onChange={e=>setpassword(e.target.value)}/>
                <div class="file-field input-field">
               <div class="btn waves-effect waves-light #64b5f6 blue darken-1">
                   <span>Upload Pic</span>
                   <input type="file" onChange={e=>setimage(e.target.files[0])}/>
               </div>
               <div class="file-path-wrapper">
                   <input class="file-path validate" type="text"/>
               </div>
               </div>
                <Button variant="contained" color="primary" onClick={()=>postData()}>Signup</Button>
                <h5>Already Have An Account ? <Link to="/signin"> <Button variant="contained" color="primary">Signin</Button></Link> </h5>
            </div>
        </div>
    )
}

export default Signup