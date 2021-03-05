import React,{ useState,useEffect,useContext} from "react"
import {UserContext} from "../../App"
import classes from "./profile.module.css"

const Profile = ()=>{
    const[Post,setPost]=useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
         fetch("http://localhost:8080/mypost",{
             headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
             }
         }).then(res=>res.json()).then(result=>setPost(result.post))
    },[])
console.log("testing async")
console.log(Post)
console.log(state)
    return(
        <>
        <div>
            
        </div>
        {state && user ?  <div className={classes.mainstyle}>
        <div className={classes.styleone}>
        <div>
        <img alt=""   
        style={{width:"190px",height:"190px",borderRadius:"90px"}} 
        src={state? state.pic:""} />
         </div>
         <div >
         <h5>{state.name}</h5>
         <h5>{state.email}</h5>
         <div className={classes.styletwo}>
         <h6> {Post.length}_Post- </h6>
         <h6> - {user.followers.length}_Followers-</h6> 
           <h6> - {user.following.length }_Following-</h6>
         </div>
      </div>
    </div>
    <div className={classes.gallery}>
        <div >
            { 
               Post.map(item=>{
                   return(
                    <img alt= {item.title} className={classes.item} src ={item.image} />
                   )
               })
            }
          
           
        </div>
    </div>
</div> : "loading"}
      
</>
    )
}

export default Profile