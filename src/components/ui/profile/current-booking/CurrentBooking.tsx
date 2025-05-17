'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BookingDetailsCard from '@/components/shared/BookingDetailsCard';
import { LiaSortSolid } from 'react-icons/lia';
 
export interface BookingCardProps {
  id: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  time: string;
  origin: string;
  destination: string;
  distance: string;
  vehicleType: string;
  vehicleClass: string;
  price: number;
  passengers: {
    adults: number;
    kids: number;
  };
}  


const bookings : BookingCardProps[] = [
  {
    id: '1',
    date: 'Monday, May 12, 2025',
    status: 'Confirmed',
    time: '11:30 AM',
    origin: 'San José',
    destination: 'Heredia',
    distance: '48KM Far from Pickup Location',
    vehicleType: 'shuttle',
    vehicleClass: 'Economy Class',
    price: 900.00,
    passengers: {
      adults: 2,
      kids: 1
    }
  },
  {
    id: '2',
    date: 'Tuesday, June 28th, 2025',
    status: 'Pending',
    time: '11:30 AM',
    origin: 'San José',
    destination: 'Heredia',
    distance: '48KM Far from Pickup Location',
    vehicleType: 'shuttle',
    vehicleClass: 'Economy Class',
    price: 1700.00,
    passengers: {
      adults: 4,
      kids: 2
    }
  },
  {
    id: '3',
    date: 'Saturday, June 30th, 2025',
    status: 'Canceled',
    time: '11:30 AM',
    origin: 'San José',
    destination: 'Heredia',
    distance: '48KM Far from Pickup Location',
    vehicleType: 'shuttle',
    vehicleClass: 'VIP Class',
    price: 1400.00,
    passengers: {
      adults: 4,
      kids: 0
    }
  } ,
   {
    id: '4',
    date: 'Monday, May 12, 2025',
    status: 'Confirmed',
    time: '11:30 AM',
    origin: 'San José',
    destination: 'Heredia',
    distance: '48KM Far from Pickup Location',
    vehicleType: 'shuttle',
    vehicleClass: 'Economy Class',
    price: 900.00,
    passengers: {
      adults: 2,
      kids: 1
    }
  },
]; 

const CurrentBooking = () => {
  const [sortBy, setSortBy] = useState('Date');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Sort options would be implemented here
  const sortedBookings = [...bookings];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-content1">Current Booking</h1>
        
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
          <BookingDetailsCard key={booking.id} booking={booking} type="Current Booking" />
        ))}
      </div>
    </div>
  );
};

export default CurrentBooking;