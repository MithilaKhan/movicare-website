import { baseApi } from "@/redux/base/baseApi";

const contactSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({     

    postContact: build.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
  }) 
}); 

export const {usePostContactMutation} = contactSlice;