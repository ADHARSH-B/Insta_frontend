import React,{ useState,useEffect,useContext} from "react"
import Preloader from "./preloader"
import { useParams } from "react-router-dom"
import classes from "./profile.module.css"
import Button from '@material-ui/core/Button';
import { UserContext } from "../../App"
const Profile = ()=>{
    const[Profile,setProfile]=useState(null)
    const {userid} = useParams()
   const {state,dispatch} = useContext(UserContext)
   console.log(state)
  // console.log(state ? !state.following.includes(userid):null)
   const[showfollow,setshowfollow] = useState(state ? !state.following.includes(userid):true)
    useEffect(()=>{
         fetch(`http://localhost:8080/profile/${userid}`,{
             headers:{
               "Authorization":"Bearer " + localStorage.getItem("jwt")
              }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            console.log(result.user.email)
            setProfile(result)
             }
            )
    },[])
    const follow_user = (id)=>{
       
        fetch("http://localhost:8080/followuser",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 userid:id
             })
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            console.log(Profile)
            dispatch({type:"UPDATE",payload:{followers:result.result.followers,following:result.result.following}})
            console.log("followers",result.result.followers)
            console.log("following",result.result.following)
             localStorage.setItem("user",JSON.stringify(result.result))
             setProfile((prevstate)=>{
                 return{
                     ...prevstate,
                    user:{
                        ...prevstate.user,
                        //followers:[...prevstate.user.followers.concat(),result._id],
                        followers:prevstate.user.followers.concat(result.result.following),
                    } 
                 }
             })
             setshowfollow(false)
            console.log(Profile)
        })
    }
    const unfollow_user = (id)=>{
        fetch("http://localhost:8080/unfollowuser",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 userid:id
             })
        }).then(res=>res.json()).then(result=>{
            console.log(Profile)
            console.log(result)
            dispatch({type:"UPDATE",payload:{followers:result.result.followers,following:result.result.following}})
             localStorage.setItem("user",JSON.stringify(result.result))
             setProfile((prevstate)=>{
                 console.log(prevstate)
                 console.log(result.result._id)
                 console.log(prevstate.user.followers)
                 let newfollower;
                 if (prevstate.user.followers.length == 0){
                    newfollower=0
                }
                else{
                     newfollower = prevstate.user.followers.filter(item=>item!=result.result._id)
                }
                 console.log(newfollower)
                 return{
                     ...prevstate,
                    user:{
                        ...prevstate.user,
                        //followers:newfollower,
                        followers:prevstate.user.followers.pop()?prevstate.user.followers:[]
                    } 
                 }
             })
             setshowfollow(true)
            console.log(Profile)
        })
    }
    
    return(
        <>
        <div></div>
        {Profile ? <div className={classes.mainstyle}>
        <div className={classes.styleone}>
        <div>
        <img alt=""   
        style={{width:"190px",height:"190px",borderRadius:"90px"}} 
        src={Profile.user.pic} />
         </div>
         <div >
         <h5>{Profile.user.name}</h5>
         <h5>{Profile.user.email}</h5>
         <div className={classes.styletwo}>
         <h6> {Profile.posts.length}-Post_ </h6>
         <h6> -{Profile.user.followers.length}_Followers-</h6>
         <h6> -{Profile.user.following.length}_Following</h6>
        {state ? !state.following.includes(userid)  ? <Button variant="contained" color="primary" style={{margin:"20px -80px"}} onClick={()=>follow_user(userid)}>Follow</Button> :
         <Button variant="contained" color="primary" style={{margin:"20px -80px"}} onClick={()=>unfollow_user(userid)}>UnFollow</Button>:null  } 
       
         </div>
      </div>
    </div>
     <div className={classes.gallery}>
        <div >
            { 
               Profile.posts.map(item=>{
                   return(
                    <img alt= {item.title} className={classes.item} src ={item.image} />
                   )
               })
            }
        </div>
    </div> 
</div> : <Preloader/>}
       </>

    )
}

export default Profile