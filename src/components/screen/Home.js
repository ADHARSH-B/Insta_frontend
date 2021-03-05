import React ,{ useState,useEffect ,useContext } from "react"
import  "./home.css"

import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import {UserContext}  from '../../App'
import { Link } from "react-router-dom"
import openSocket from "socket.io-client"
import Preloader from "./preloader"
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
const Home = ()=>{
    const[comment,setcomment]=useState(false)
    const{state,dispatch} = useContext(UserContext)
  console.log(state)
    const commentHandler = ()=>{
        setcomment(!comment)
    }
    const[Post,setPost] = useState([])
    useEffect(()=>{
         fetch("http://localhost:8080/allpost",{
             headers:{
                 "Authorization":"Bearer " + localStorage.getItem("jwt")
             }
         }).then(res=>res.json()).then(result=>setPost(result.allpost))
         const socket = openSocket("http://localhost:8080")
        // socket.on("Likes",data=>{
          //   if(data.action == 'like'){
                // likespost(data.result)
            // }
             //if(data.action == "unlike"){
               //  unlikespost(data.result)
            // }
         //})
        },[])


    const likepost = (id)=>{
        fetch("http://localhost:8080/like",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res=>res.json()).then(datas=>
            {   
                const data=datas.result
                const post = [...Post]
                const Index = post.findIndex(post=>{
                    return(
                        post._id == data._id
                    )
                })
                console.log("index",Index)
                if(Index>-1){
                    post[Index] = data
                    setPost(post)
                }
            })
    }
    const unlikepost = (id)=>{
        fetch("http://localhost:8080/unlike",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res=>res.json()).then(data=>{
             const result = data.result
            const newData = Post.map(item=>{
                if(item._id == result._id){
                     return result
                }
                else{
                    return item
                }
            })
            console.log("newData",newData)
            setPost(newData)
        })
    }
    const commentpost = (id,comments)=>{
        fetch("http://localhost:8080/makecomment",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postid:id,
                comment:comments
            })
        }).then(res=>res.json()).then(data=>{
           const result = data.result
           const newData = Post.map(item=>{
               if(item._id == result._id){
                    return result
               }
               else{
                   return item
               }
           })
           console.log("newData",newData)
           setPost(newData)
       })
    }
    const deleteposthandler = (postid)=>{
        fetch(`http://localhost:8080/deletepost/:${postid}`,{
            method:"DELETE",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            }
        })
        .then(res=>res.json())
        .then(data=>{
            const result = data.result
           const newData =  Post.filter(
               post=>{
                   return post._id !== result._id
               }
           )
           setPost(newData)
        })
    }
    return(
        <>
        {Post ? Post.length > 0 ?
        <div>
        {Post.map(item=>{
            console.log(item)
            return(
                <div className="card main_cls">
                    {state._id === item.createdby._id ? <DeleteIcon style={{marginLeft:"350px",cursor:"pointer"}} onClick={()=>{deleteposthandler(item._id)}}/> :null }
                   <h5><Link to = {state._id !== item.createdby._id ? "/profile/"+item.createdby._id : "/profile" }  >{item.createdby.name}</Link></h5>
                   <div className="card-image">
                       <img alt={item.title} src={item.image}/>
                   </div>
                   <div style={{margin:"2px 25px"}}>
                        <h6>{ item.title }</h6>
                         <p>{ item.body  }</p>
                   </div>
                   <div className="card-content coment" style={{display:"flex"}}>
                       { item.likes.includes(state._id) 
                       ?
                          <FavoriteIcon style={{color:"red"}} onClick={()=>unlikepost(item._id)}/>
                        :
                        <FavoriteBorderIcon onClick={()=>{
                            likepost(item._id)
                        }
                            
                            }/>
                       }
                     
                        <h6 style={{marginLeft:"-19%",marginTop:"25px"}}>{item.likes.length} Likes</h6>
                     
                            <InsertCommentOutlinedIcon style={{marginLeft:"20%"}} onClick={commentHandler}/>
                            <h6 style={{marginLeft:"-19%",marginTop:"25px"}}>{item.comment.length} Comments</h6>
                    
                       <ShareIcon/>
                       {comment=== true? 
                       <form onSubmit = {e=>{
                        e.preventDefault()
                        console.log(e.target)
                        commentpost(item._id,e.target[0].value) } 
                       }
                      >
                       <input type="text"  placeholder="Comment" />
                      
                       </form>
                       :null }
                   </div>
                   {comment=== true? 
                   <div className="card-content coment">
                   {item.comment.map(pos=>{
                           console.log(pos)
                           return(
                               <div >
                           <h6 ><span style={{fontWeight:"500"}}> {pos.postedby[0].name} : </span>{pos.text}</h6>
                           </div>
                           )
                       })}
                </div>:null
               }
               </div>
            )
                  
        })}
       </div> : <Preloader/>:<Preloader/> }
        </>
        
    )
}

export default Home