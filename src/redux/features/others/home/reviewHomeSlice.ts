import { baseApi } from "@/redux/base/baseApi";

export type Review = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string; 
    image: string
  };
  comment: string;
  rating: number;
  featured: boolean;
  booking: string;
}; 

const reviewForHome = baseApi.injectEndpoints({
  endpoints: (build) => ({   

    getSelectedReviews: build.query({
      query: () => ({ 
        url: "/review/featured",
       }),
       transformResponse: (response: {data: Review[]}) => response.data,
    }),
  }) 
});  

export const { useGetSelectedReviewsQuery } = reviewForHome