import { Booking } from "@/components/ui/profile/current-booking/CurrentBooking";
import { baseApi } from "@/redux/base/baseApi";
 
export interface Review {
  _id: string;
  comment: string;
  rating: number;
  featured: boolean;
  booking: Booking;
} 

interface ReviewData {
  data: Review[]
}
const profileReviewSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({   

    createReview: build.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }), 
    }),  

    getProfileReviews: build.query({
      query: () => ({
        url: "/review",
      }),
      transformResponse: (response: { data: ReviewData }) => response.data.data,
    })

   }) 
}) 

export const { useCreateReviewMutation , useGetProfileReviewsQuery } = profileReviewSlice