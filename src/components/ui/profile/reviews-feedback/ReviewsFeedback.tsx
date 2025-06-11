"use client"
import React from 'react';
import CreateReview from './CreateReview';
import ReviewCard from './ReviewCard';
import { useSearchParams } from 'next/navigation';
import { useGetBookingsDetailsQuery } from '@/redux/features/others/booking/bookingSlice';
import { useGetProfileReviewsQuery } from '@/redux/features/profile/review/reviewSlice';

export interface ReviewType {
    id: string;
    rating: number;
    pickUpCity: string;
    dropOffCity: string;
    date: string;
    time: string;
    descriptions: string;
}

const ReviewsFeedback = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data: bookingDetails } = useGetBookingsDetailsQuery(id);
    const { data: AllReviews } = useGetProfileReviewsQuery(undefined);
    console.log(AllReviews);

    const reviews = AllReviews?.map((values) => ({
        id: values._id,
        rating: values.rating,
        pickUpCity: values.booking?.pickup_location,
        dropOffCity: values.booking?.dropoff_location,
        date: values.booking?.date,
        time:"11:30 AM",
        descriptions: values.comment
    }))
    return (
        <div>
            <h1 className="text-xl font-medium text-content1 pb-6">Reviews & Feedback</h1>

            {/* create review  */}
            <CreateReview bookingDetails={bookingDetails} id={id} />

            {/* all reviews  */}

            <p className=' text-content1/50 text-sm  mt-4 py-6 font-semibold'> All reviews </p>

            <div className='flex flex-col gap-4 pb-5'>

                {
                    reviews?.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                }
            </div>
        </div>
    );
};

export default ReviewsFeedback;