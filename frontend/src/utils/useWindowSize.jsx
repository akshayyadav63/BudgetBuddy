import { useEffect,useState } from "react"



export const useWindowSize=()=>{
    const [size,setsize]=useState([0,0])
    useEffect(()=>{
     const updatesize=()=>{
        setsize([window.innerWidth,window.innerHeight])
     }
     window.addEventListener('resize',updatesize)
     return()=>window.removeEventListener('resize',updatesize)
    },[])
    return {
        width:size[0],
        height:size[1]
    }
}