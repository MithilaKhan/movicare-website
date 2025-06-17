"use client"
import { Clock } from 'lucide-react';
import { BookingCardProps } from '../ui/profile/current-booking/CurrentBooking';
import StatusBadge from '../ui/profile/current-booking/StatusBadge';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RebookModal from '../ui/profile/booking-history/RebookModal';
import moment from 'moment';
import { useCancelBookingMutation } from '@/redux/features/others/booking/bookingSlice';
import { toast } from 'react-toastify';
import { errorType } from '../ui/websitePages/contact/SendMessage';

const BookingDetailsCard = ({ booking, type }: { booking: BookingCardProps, type: string }) => {
  const [isRebookOpen, setIsRebookOpen] = useState(false);
  const router = useRouter()
  const [cancelBooking, { isError, isLoading, isSuccess, error, data }] = useCancelBookingMutation() 
  console.log(booking, "booking");

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data]);

  const handleCancel = async(id: string) => { 

    const data = {
      status: "cancelled"
    } 

   await cancelBooking({id, data}).then((res) => {
      console.log(res);
    })  
    
  }


  return (
    <div className="mb-6 rounded-lg border p-4 border-gray-200 bg-white overflow-hidden shadow-sm ">
      {/* Header */}
      <div className="bg-[#f4f7f4] border border-[#d6e2d6] px-4 py-3 flex justify-between items-center rounded-xl">
        <div className="flex items-center space-x-3">
          <span className="lg:text-sm text-xs font-medium text-[#000000]">{moment(booking.date).format("DD/MM/YYYY")}</span>
          <StatusBadge status={booking.status} />
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="h-4 w-4 mr-1 text-primary" />
          <span className="lg:text-sm text-xs text-[#000000]">{booking.time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-0  gap-7 border border-gray-200 rounded-xl mt-5 ">
        <div className="">
          <div className="flex lg:flex-row flex-col items-baseline">
            <h3 className="lg:text-xl text-lg font-semibold  w-[300px] ">{booking.origin}</h3>
            <span className="mx-2 text-content1/50 text-sm">To</span>
            <h3 className="lg:text-xl text-lg font-semibold  w-[300px] lg:ps-4">{booking.destination}</h3>
          </div>
          <p className="lg:text-sm text-xs text-content1/50 lg:mt-4 mt-2">{booking.distance}KM Far from Pickup Location</p>
        </div>

        <div className=" flex flex-col justify-center lg:items-center items-start">
          <div className="relative ">
            <img
              src="/class.svg"
              alt="Shuttle"
              className="opacity-90 lg:h-16  lg:w-[175px]"
            />
          </div>
          <p className="text-xs text-content1/50 font-medium ">{booking.vehicleClass}</p>
        </div>

        {
          type !== "Booking History" && (
            <button className=' h-11 flex items-center justify-center text-sm font-medium bg-red-500 gap-2 text-white px-4   rounded-full ' onClick={() => handleCancel(booking.id)}> {isLoading ? "Canceling..." : "Cancel Booking"}  </button>
          )
        }

        <div className="">
          <div className="flex lg:flex-col flex-row lg:items-end items-center lg:gap-0 gap-4">
            <p className="lg:text-[32px] text-2xl font-medium text-content1">${booking.price.toFixed(2)}</p>
            <div className="mt-1 flex items-center justify-end">
              {booking.passengers.adults > 0 && (
                <span className="text-sm text-content1/70 border-e border-gray-200 pe-3 ">{booking.passengers.adults} Adults</span>
              )}
              {booking.passengers.kids > 0 && (
                <span className="text-sm text-content1/70 ps-3">{booking.passengers.kids} Kids</span>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* rebook and review option   */}
      {
        type === "Booking History" && (
          <div className=' flex items-center justify-between lg:gap-10 gap-2 mt-6 mb-3 '>

            <button className=' h-11 flex items-center justify-center text-sm font-medium bg-primary gap-2 text-white   rounded-full w-full hover:bg-white hover:text-primary hover:border hover:border-primary ' onClick={() => setIsRebookOpen(true)}> Rebook </button>

            <button className=' h-11 flex items-center justify-center text-sm font-medium bg-white gap-2 text-[#000000] border border-primary   rounded-full w-full hover:bg-primary hover:text-white '
              onClick={() => router.push(`/reviews-feedback?id=${booking.id}`)}>  Leave a Review </button>

          </div>
        )
      }
      <RebookModal open={isRebookOpen} setOpen={setIsRebookOpen} booking={booking} />
    </div>
  );
};

export default BookingDetailsCard;