'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BookingDetailsCard from '@/components/shared/BookingDetailsCard';
import { LiaSortSolid } from 'react-icons/lia';
import { useGetAllBookingsHistoryQuery } from '@/redux/features/others/booking/bookingSlice';


const BookingHistory = () => {
  const [sortBy, setSortBy] = useState('Date');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const {data} = useGetAllBookingsHistoryQuery(undefined) 

  const bookings = data?.map((booking) => ({
    id: booking._id,
    date:  booking.date,
    status: booking.status,
    time: "11:30 AM",
    origin: booking.pickup_location,
    destination: booking.dropoff_location,
    distance: booking.distance,
    vehicleClass: booking.provider.name,
    price: booking.service.service_price,
    passengers: {
      adults: booking.adults,
      kids: booking.kids
    }
  }))
  
  // Sort options would be implemented here
  const sortedBookings = [...(bookings ?? [])];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-content1">Booking History</h1>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-1 text-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          > 
          <span> <LiaSortSolid size={16} className='text-content1/50' /> </span>
            <span className="text-[16px] text-content1/50 ">Sort By:</span>
            <span className="font-medium text-content1 ">{sortBy}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy('Date');
                    setIsDropdownOpen(false);
                  }}
                >
                  Date
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy('Price');
                    setIsDropdownOpen(false);
                  }}
                >
                  Price
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortBy('Status');
                    setIsDropdownOpen(false);
                  }}
                >
                  Status
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        {sortedBookings.map((booking) => (
          <BookingDetailsCard key={booking.id} booking={booking} type="Booking History" />
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;