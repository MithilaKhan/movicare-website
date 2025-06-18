// "use server"
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

// const baseApi = "http://119.148.56.246:5001/api/v1";
// async function myFetch(url: string,body?:any,method:string = "GET",headers?:any){ 
//     const headers = {
//     "Authorization": `Bearer ${ await getAccessToken()}`
// }
//     const response = await fetch(`${baseApi}/post`,{
//         next:{
//             tags: ['posts']
//         },
    
//     });
// }

// revalidateTag("posts")

// export const getAccessToken = async ()=>{
//     const accessToken = await cookies().get('accessToken')?.value
//     return accessToken
// }
