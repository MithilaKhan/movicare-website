import { baseApi } from "@/redux/base/baseApi";

const bookingSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({   
  
    createBooking: build.mutation({
      query: (data) => ({
        url: `/booking`,
        method: "POST",
        body: data,
      }), 
    }),
   }) 
}) 

export const {useCreateBookingMutation} = bookingSlice