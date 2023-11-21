import { existsSync } from "fs";
import { readdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server"
import path from 'path'

export const GET = async(request)=>{
    const files = await readdir("./public/images");
    return NextResponse.json({msg:"image get successfully",files})

}

//delete image work ✅
// export const DELETE = async(request)=>{
//     // const files = await readdir("./public/images");
//     const imageName = await request.nextUrl.searchParams.get("image");

//     if(existsSync(`./public/images/${imageName}`)){
//         unlink(`./public/images/${imageName}`);
//     }
    
//     return NextResponse.json({msg:"image delete successfully"})

// }

export const POST =async (request)=>{

    const file = await  request.formData();

    const image = file.get("image")

    const byteLength = await image.arrayBuffer();

    const bufferData = await Buffer.from(byteLength);


    const pathOfImage = `./public/images/${new Date().getTime()}${path.extname(image.name)}`


    writeFile(pathOfImage,bufferData)


console.log(pathOfImage);
    return NextResponse.json({msg:"image upload successfully"})
}