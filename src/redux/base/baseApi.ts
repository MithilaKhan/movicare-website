
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'; 

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.70.146:5001/api/v1", 
      // baseUrl: "http://10.0.70.208:5002/api/v1" ,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken"); 
      console.log("Token from cookies:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["profile"],
});

export const imageUrl = "http://10.0.70.146:5001/"; 
// export const imageUrl = "http://10.0.70.208:5002/";  