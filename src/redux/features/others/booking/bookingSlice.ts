import { Booking, BookingData } from "@/components/ui/profile/current-booking/CurrentBooking";
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

    getBookingsDetails: build.query({
      query: (id) => ({
        url: `/booking/single/${id}`,
      }),
      transformResponse: (response: { data: Booking }) => response.data,
    }),

    getAllBookingsHistory: build.query({
      query: (durationType) => {
        const params = new URLSearchParams()
        if (durationType) params.append('durationType', durationType)
        return {
          url: `/booking?${params.toString()}`,
        }
      },
      transformResponse: (response: { data: BookingData }) => response.data.data,
    }),

    rebookBooking: build.mutation({
      query: (data) => ({
        url: `/booking/rebook/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),

    cancelBooking: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/booking/${id}`,
          method: "PATCH",
          body: data
        }
      },
    })

  })
})

export const { useCreateBookingMutation, useGetAllBookingsHistoryQuery, useRebookBookingMutation, useGetBookingsDetailsQuery, useCancelBookingMutation } = bookingSlice