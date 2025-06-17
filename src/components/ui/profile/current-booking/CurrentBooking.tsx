'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BookingDetailsCard from '@/components/shared/BookingDetailsCard';
import { LiaSortSolid } from 'react-icons/lia';
import { useGetAllBookingsHistoryQuery } from '@/redux/features/others/booking/bookingSlice';
import moment from 'moment';



export interface Booking {
  _id: string;
  service: Service;
  user: User;
  provider: Provider;
  date: string; // ISO string
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string;
  status: "confirmed" | "pending" | "canceled"; // Adjust based on all possible values
  payment_status: 'paid' | 'unpaid' | 'refunded'; // Adjust based on all possible values
  base_fare: number;
  service_charge: number;
  additional_travelerse_fee: number;
  kids: number;
  adults: number;
  tax: number;
  formatted_date: string; // ISO string
  additional_info: string;
  total_price: number;
  order_id: string;
  distance: number; // in km
  duration: number; // in hours
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
  adults_price: number;
  kids_price: number;
  service_price: number;
  price_per_km: number;
  price_per_hour: number;
  taxs: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Provider {
  _id: string;
  name: string;
  description: string;
  image: string;
  facilities: string[];
  price: number;
  service: string;
  status: 'active' | 'inactive';
  __v: number;
}


export interface BookingCardProps {
  id: string;
  date: string;
  status: 'confirmed' | 'pending' | 'canceled';
  time: string;
  origin: string;
  destination: string;
  distance: number;
  vehicleClass: string;
  price: number;
  passengers: {
    adults: number;
    kids: number;
  };
}


const CurrentBooking = () => {
  const [sortBy, setSortBy] = useState('Date');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const durationType = "current"
  const { data } = useGetAllBookingsHistoryQuery(durationType)
  console.log(data,);

  const bookings = data?.map((booking) => ({
    id: booking._id,
    date: booking.date,
    status: booking.status,
    time: moment(booking.pickup_time).format('hh:mm A'),
    origin: booking.pickup_location,
    destination: booking.dropoff_location,
    distance: booking.distance,
    vehicleClass: booking.provider.name,
    price: booking.total_price,
    passengers: {
      adults: booking.adults,
      kids: booking.kids
    }
  }))

  // Sort options would be implemented here
  const sortedBookings = [...bookings ?? []];

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