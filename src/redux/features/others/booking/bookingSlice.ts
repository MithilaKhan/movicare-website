import { Booking } from "@/components/ui/profile/current-booking/CurrentBooking";
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
      transformResponse: (response: { data: Booking[] }) => response.data,
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
    }),

    unavailableDateSlot: build.query({
      query: () => ({
        url: `/booking/slots`,
      }),
      transformResponse: (response: { data: string[] }) => response.data,
    }),

    allTimeSlots: build.query({
      query: (date) => {  
        const params = new URLSearchParams()
        if (date) params.append('date', date)
        return {
          url: `/booking/time-slots?${params.toString()}`,
        }
      }
    }) , 

    checkSlots: build.mutation({
      query: (data) => ({
        url: `/booking/check`,
        method: "POST",
        body: data,
      }),
    }),

  })
})

export const { useCreateBookingMutation, useGetAllBookingsHistoryQuery, useRebookBookingMutation, useGetBookingsDetailsQuery, useCancelBookingMutation, useUnavailableDateSlotQuery , useAllTimeSlotsQuery , useCheckSlotsMutation } = bookingSlice