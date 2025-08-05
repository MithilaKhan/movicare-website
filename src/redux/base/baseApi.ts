
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'; 

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.movicare.cr/api/v1", 
      // baseUrl: "http://10.10.7.6:5006/api/v1" ,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["profile"],
});

export const imageUrl = "https://api.movicare.cr/"; 
// export const imageUrl = "http://10.10.7.6:5006/api/v1";  