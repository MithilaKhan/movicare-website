import { baseApi } from "@/redux/base/baseApi";

const companiesSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({ 

    getCompanies: build.query({
      query: () => ({
        url: "/client",
      }),  
      transformResponse: (response: {data:{_id:string , image:string}[]}) => response.data,
    }), 

   }) 
});  

export const { useGetCompaniesQuery } = companiesSlice;
