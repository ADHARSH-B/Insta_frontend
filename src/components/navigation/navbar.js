import React from "react"
import {Link , withRouter} from "react-router-dom"
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import {useContext,useRef,useEffect,useState} from "react"
import { UserContext } from '../../App'
import M from "materialize-css"

const Navbar = (props)=>{
  const {state,dispatch} = useContext(UserContext)
  const [ searchuser,setsearchuser ] =useState("")
  const [ userdetails,setuserdetails ] =useState([])
  const Searchuser = useRef(null)
  useEffect(()=>{
    M.Modal.init(Searchuser.current)
  },[])
   const renderlist = ()=>{
     if(state){
       return[ 
        <li>  <i className="large material-icons modal-trigger" data-target="modal1" style={{color:"black",marginRight:"20px",cursor:"pointer"}}>search</i></li>,
        <li><Link style={{marginTop:"10px",borderStyle:"solid",borderRadius:"55px",padding:"2px"}} to="/profile"> <Avatar alt="" src={state?state.pic:""} /></Link></li>,
        <li><Link to="/followingpost">My folllowingpost</Link></li>,
        <li><Link to="/createpost">Createpost</Link></li>,
        <Button style={{color:"red"}} onClick={ ()=>{
          localStorage.clear()
          dispatch({type:"LOGOUT"})
          props.history.push("/signin")
          M.toast({html:"User Logget out!!",classes:"rounded red"})
        }}>Logout</Button>,
       ]
     }
     else{
       return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
       ]
     }
   }
  
const postdata = (query)=>{
  setsearchuser(query)
  fetch("https://instabackapi.herokuapp.com/searchuser",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt") 
    },
    body:JSON.stringify({
      query
    })
  }).then(res=>res.json()).then(result=>{
  setuserdetails(result.result)
  }).catch(err=>{
    console.log(err)
  })
}

    return(
        <nav >
        <div className="nav-wrapper">
          <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right alignment">
           {renderlist()}
          </ul>
        </div>
      <div id="modal1" class="modal" ref={Searchuser} style={{color:"black"}}>
        <div class="modal-content" >
        <input type="text" name="search" placeholder="Search user"  value = {searchuser} onChange={(event)=>postdata(event.target.value)} autoComplete/>
        <ul class="collection">
        {userdetails.map(item=>{
           return<a href={ state._id == item._id ?"/profile" :"/profile/"+item._id}><li class="collection-item" onClick={()=>{
             M.Modal.getInstance(Searchuser.current).close()
           }}>{item.name}</li></a> 
        })}
    </ul>    
          </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000flat">Close</a>
        </div>
  </div>
          
      </nav>

        
    )
}

export default withRouter(Navbar)   