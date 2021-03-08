import React,{ useState,useEffect} from "react"
import M from "materialize-css"
import Button from '@material-ui/core/Button';
import Preloader from "./preloader"
import "./createpost.css"
const Createpost = Props=>{
    const [preloader,setpreloader]=useState(false)
    const [title,settitle]=useState("")
    const[bod,setbod]=useState("")
    const[image,setimage]=useState("")
    const[url,seturl]=useState("")
  
    useEffect(()=>{
        if(url){
            fetch("https://instabackapi.herokuapp.com/createpost",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                title:title,
                body:bod,
                url:url
            })
        }).then(res=>res.json()).then(data=>{
              if(data.error){
                M.toast({html: data.error,classes: 'rounded red'})
              }
              else{
                  setpreloader(false)
                  M.toast({html:data.message,classes: 'rounded green'})
                  Props.history.push("/")
              }
        }).catch(err=>console.log(err))
        }
        

    },[url])
    const postDetails=()=>{
        setpreloader(true)
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
    let loader = (
        <div className="card main_cls">
        <h2  class="brand-log ">Instagram</h2>
            <input type="text" placeholder="Enter a title" value={title} onChange={e=>settitle(e.target.value)}/>
            <input type="text" placeholder="Enter Something about post" value={bod} onChange={e=>setbod(e.target.value)}/>
            <div class="file-field input-field">
               <div class="btn waves-effect waves-light #64b5f6 blue darken-1">
                   <span>Upload Pic</span>
                   <input type="file" onChange={e=>setimage(e.target.files[0])}/>
               </div>
               <div class="file-path-wrapper">
                   <input class="file-path validate" type="text"/>
               </div>
               </div>
            <Button variant="contained" color="primary" onClick={()=>postDetails()} >Click To Createpost!!</Button>
        </div>
    )
   
    if(preloader){
        loader=<Preloader/>
    }
    return(
      <div >
        {loader}
      </div>
    )
}

export default Createpost