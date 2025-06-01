
import { GetLocalStorage } from "@/util/LocalStroage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.70.146:5001/api/v1", 
      // baseUrl: "http://10.0.70.208:5002/api/v1" ,
    prepareHeaders: (headers) => {
      const token = GetLocalStorage("AccessToken");
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