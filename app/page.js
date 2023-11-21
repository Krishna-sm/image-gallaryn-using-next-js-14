'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {

  const [allimage,setAllImage] = useState([])

  const FetchImage = async()=>{
    const response = await axios.get("/api/upload");
    const data = await response.data;

    // console.log({data});
    setAllImage(data?.files)
  }

  // /delete image work ✅
  // const DeleteImage = async(name)=>{
  //   const response = await axios.delete("/api/upload",{
  //     params:{
  //       image:name
  //     }
  //   });
  //   const data = await response.data;
  //   FetchImage()
  //   console.log({data});
  // }



  const [image,setImage] = useState(null);

  const OnSubmitHandler = async(e)=>{
    e.preventDefault()
    // console.log({image});

    if(!image){
      alert("plese upload image")
      return 
    }

    const formData = new FormData();

    formData.append("image",image);

    // api code
    const response = await axios.post("/api/upload",formData);
    const data = await response.data;
    FetchImage()
    // console.log({data});

    // alert("form uload")
  }


  useEffect(()=>{
    FetchImage()
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5">
     

      <form onSubmit={OnSubmitHandler} className="w-1/2 mx-auto flex flex-col gap-5">
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="" />
      <div className="flex justify-center items-center">
      <button type='submit' className="px-12 py-3  rounded text-white bg-red-500">Upload</button>
      </div>
      </form>

      <div className="w-full flex flex-wrap">

{
  allimage&& allimage.length>0 && allimage.map((cur,i)=>{
    return <div key={i} className='w-1/3 mx-auto p-4 border border-purple-500 ring-2'>

      <img src={`./images/${cur}`} alt={`image${i}`} />
{/* /delete image work ✅ */}
      {/* <button onClick={()=>DeleteImage(cur)} className='px-5 py-2 bg-black text-white rounded mr-auto my-2'>delete </button> */}
      </div>
  })
}

        </div>
    </main>
  )
}
