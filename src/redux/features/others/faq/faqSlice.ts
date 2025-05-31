import { baseApi } from "@/redux/base/baseApi";

const faqSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({     

    getFaqs: build.query({
      query: () => ({ 
        url: "/faq",
      }),
      transformResponse: (response: {data:{_id:string , description:string , title:string}[]}) => response.data, 
    }),
  }) 
}); 

export const {useGetFaqsQuery } = faqSlice;
