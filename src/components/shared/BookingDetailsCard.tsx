"use client"
import { Clock } from 'lucide-react';
import { BookingCardProps } from '../ui/profile/current-booking/CurrentBooking';
import StatusBadge from '../ui/profile/current-booking/StatusBadge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RebookModal from '../ui/profile/booking-history/RebookModal';



const BookingDetailsCard = ({ booking, type }: { booking: BookingCardProps, type: string }) => {
  const [isRebookOpen, setIsRebookOpen] = useState(false);
  const router = useRouter()

  return (
    <div className="mb-6 rounded-lg border p-4 border-gray-200 bg-white overflow-hidden shadow-sm ">
      {/* Header */}
      <div className="bg-[#f4f7f4] border border-[#d6e2d6] px-4 py-3 flex justify-between items-center rounded-xl">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-[#000000]">{booking.date}</span>
          <StatusBadge status={booking.status} />
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="h-4 w-4 mr-1 text-primary" />
          <span className="text-sm text-[#000000]">{booking.time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex justify-between items-center border border-gray-200 rounded-xl mt-5 ">
        <div className="">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-semibold">{booking.origin}</h3>
            <span className="mx-2 text-content1/50 text-sm">To</span>
            <h3 className="text-2xl font-semibold">{booking.destination}</h3>
          </div>
          <p className="text-sm text-content1/50 mt-4">{booking.distance}</p>
        </div>

        <div className=" flex flex-col justify-center items-center">
          <div className="relative ">
            <img
              src="/class.svg"
              alt="Shuttle"
              className="opacity-90 h-16 w-[175px]"
            />
          </div>
          <p className="text-xs text-content1/50 font-medium ">{booking.vehicleClass}</p>
        </div>

        <div className="">
          <div className="flex flex-col items-end">
            <p className="text-[32px] font-medium text-content1">${booking.price.toFixed(2)}</p>
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
          <div className=' flex items-center justify-between gap-10 mt-6 mb-3 '> 

            <button className=' h-11 flex items-center justify-center text-sm font-medium bg-primary gap-2 text-white   rounded-full w-full hover:bg-white hover:text-primary hover:border hover:border-primary ' onClick={() => setIsRebookOpen(true)}> Rebook </button> 

            <button className=' h-11 flex items-center justify-center text-sm font-medium bg-white gap-2 text-[#000000] border border-primary   rounded-full w-full hover:bg-primary hover:text-white '
              onClick={() => router.push("/reviews-feedback")}>  Leave a Review </button> 

          </div>
        )
      } 
      <RebookModal open={isRebookOpen} setOpen={setIsRebookOpen} />
    </div>
  );
};

export default BookingDetailsCard;