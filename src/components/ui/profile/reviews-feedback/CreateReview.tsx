"use client"
import { ConfigProvider, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Clock } from "lucide-react";
import { IoMdArrowForward } from "react-icons/io";
import { Booking } from "../current-booking/CurrentBooking";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCreateReviewMutation } from "@/redux/features/profile/review/reviewSlice";
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";

const CreateReview = ({ bookingDetails, id }: { bookingDetails: Booking | undefined, id: string|null }) => {
    const [form] = Form.useForm();
    const [rating , setRating] = useState<number | null>() 
    const [createReview , {isLoading , isError , isSuccess , error , data}] = useCreateReviewMutation() 

      useEffect(() => {
        if (isSuccess) {
          toast.success(data?.message); 
          form.resetFields(); 
          setRating(null)
        }
    
        if (isError) {
          const errorMessage =
            (error as errorType)?.data?.errorMessages
              ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
              : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
          toast.error(errorMessage);
        }
      }, [isSuccess, isError, error, data , form]); 

    const onFinish = (values:{descriptions:string}) => {
        const data ={
            booking: id,
            rating: rating,
            comment: values.descriptions
        } 
    
        createReview(data)
    } 

    return (
        <div className=" mb-4">
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
                          <Rate allowHalf value={rating ?? 0} onChange={(value) => setRating(value)} />
                        </ConfigProvider>  </div>

                    <div className=" flex flex-wrap  items-center ">
                        <p className="flex items-center gap-2 text-content1 lg:text-sm text-xs font-medium border-e border-gray-200 lg:pe-3 pe-1"> <span> {bookingDetails?.pickup_location} </span> <span><IoMdArrowForward size={16} color="#7e7f7e" /> </span> <span> {bookingDetails?.dropoff_location} </span> </p>
                        <p className=" text-content1 lg:text-sm text-xs font-medium border-e border-gray-200 lg:ps-3 ps-1 lg:pe-3 pe-1"> {moment(bookingDetails?.date).format("dddd , MMM D, YYYY")}</p>
                        <p className="flex items-center justify-end lg:ps-3 ps-1 ">
                            <Clock className="h-4 w-4 mr-1 text-primary " />
                            <span className="lg:text-sm text-xs text-[#000000]">11:30 AM</span>
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item name={"descriptions"}>
                            <TextArea rows={4} style={{ resize: 'none', backgroundColor: '#f4f7f4', border: '1px solid #d6e2d6' }} className="w-full rounded-xl  p-4" placeholder="Write your review" />
                        </Form.Item>

                        <Form.Item>
                            <button type="submit" className="  bg-primary text-white py-3 px-6  rounded-full"> {isLoading ? "Submitting..." : "Submit Review "}  </button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default CreateReview;