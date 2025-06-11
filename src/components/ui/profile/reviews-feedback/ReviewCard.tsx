"use client"
import { ConfigProvider, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Clock } from "lucide-react";
import { IoMdArrowForward } from "react-icons/io";
import { ReviewType } from "./ReviewsFeedback";
import moment from "moment";

const ReviewCard = ({ review }: { review: ReviewType }) => {
    return (
        <div>
            <div className=" bg-white p-4 rounded-xl border border-gray-200">

                <div className=" border border-gray-200 rounded-xl p-4 flex lg:flex-row gap-2 flex-col justify-between items-center">
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Rate: {
                                        starColor: '#FAA61A',
                                    },
                                },
                            }}
                        >
                            <Rate disabled allowHalf  defaultValue={review.rating} />
                        </ConfigProvider>  </div>

                    <div className=" flex flex-wrap items-center ">
                        <p className="flex items-center gap-2 text-content1 lg:text-sm text-xs font-medium border-e border-gray-200 lg:pe-3 pe-1"> <span> {review?.pickUpCity} </span> <span><IoMdArrowForward size={16} color="#7e7f7e" /> </span> <span> {review?.dropOffCity} </span> </p>
                        <p className=" text-content1 lg:text-sm text-xs font-medium border-e border-gray-200 lg:ps-3 ps-1 lg:pe-3 pe-1"> {moment(review?.date).format("dddd , MMM D, YYYY")} </p>
                        <p className="flex items-center justify-end lg:ps-3 ps-1  ">
                            <Clock className="h-4 w-4 mr-1 text-primary " />
                            <span className="lg:text-sm text-xs text-[#000000]">{review?.time}</span>
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <Form initialValues={{description: review?.descriptions}}>
                        <Form.Item name="description">
                            <TextArea rows={3} style={{ resize: 'none', backgroundColor: '#f4f7f4', border: '1px solid #d6e2d6' , paddingTop: '20px' }} className="w-full rounded-xl " placeholder="Write your review" />
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default ReviewCard;