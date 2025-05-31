import { baseApi } from "@/redux/base/baseApi";

const whyChooseSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({   
 
    getWhyChoose: build.query({
      query: () => ({
        url: "/facility",
      }),  
      transformResponse: (response: {data:{_id:string , image:string , title:string ,description:string }[]}) => response.data,
    }), 

  }) 
}); 

export const {useGetWhyChooseQuery  } = whyChooseSlice;