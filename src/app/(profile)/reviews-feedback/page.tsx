import ReviewsFeedback from '@/components/ui/profile/reviews-feedback/ReviewsFeedback';
import React, { Suspense } from 'react';

const ReviewFeedbackPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ReviewsFeedback />
            </Suspense>

        </div>
    );
};

export default ReviewFeedbackPage;