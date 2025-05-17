import React from 'react';
import CreateReview from './CreateReview';
import ReviewCard from './ReviewCard';

export interface ReviewType {
    id: string;
    rating: number;
    pickUpCity: string;
    dropOffCity: string;
    date: string;
    time: string;
    descriptions: string;
}

const reviews:ReviewType[] = [
    {
        id: "1",
        rating: 5,
        pickUpCity: "Dhaka",
        dropOffCity: "Rajshahi",
        date: "Monday,  May 10, 2025 ",
        time: "11:30 AM",
        descriptions: " “Booking was smooth and the driver arrived right on time. The van was clean, spacious, and accessible for my mother’s wheelchair. Will definitely use MoviCare again!” "
    },
    {
        id: "3",
        rating: 4,
        pickUpCity: "Dhaka",
        dropOffCity: "Rajshahi",
        date: "Monday,  May 10, 2025 ",
        time: "11:30 AM",
        descriptions: " “Driver was very polite and the van had all the necessary safety features. There was a 10-minute delay in pickup, but they kept us informed the whole time.” "
    },
    {
        id: "2",
        rating: 4.5,
        pickUpCity: "San José",
        dropOffCity: "Heredia",
        date: "Monday,  May 10, 2025 ",
        time: "11:30 AM",
        descriptions: " “Booking was smooth and the driver arrived right on time. The van was clean, spacious, and accessible for my mother’s wheelchair. Will definitely use MoviCare again!” "
    },

]

const ReviewsFeedback = () => {
    return (
        <div>
            <h1 className="text-xl font-medium text-content1 pb-6">Reviews & Feedback</h1>

            {/* create review  */}
            <CreateReview />

            {/* all reviews  */}

            <p className=' text-content1/50 text-sm  mt-4 py-6 font-semibold'> All reviews </p>

            <div className='flex flex-col gap-4 pb-5'>

                {
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                }
            </div>
        </div>
    );
};

export default ReviewsFeedback;