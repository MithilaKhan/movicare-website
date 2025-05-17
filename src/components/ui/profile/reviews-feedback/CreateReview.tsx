"use client"
import { ConfigProvider, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Clock } from "lucide-react";
import { IoMdArrowForward } from "react-icons/io";

const CreateReview = () => {
    return (
        <div>
            <div className=" bg-white p-4 rounded-xl border border-gray-200">

                <div className=" border border-gray-200 rounded-xl p-4 flex justify-between items-center">
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
                            <Rate allowHalf  />
                        </ConfigProvider>  </div>

                    <div className=" flex items-center ">
                        <p className="flex items-center gap-2 text-content1 text-sm font-medium border-e border-gray-200 pe-3"> <span> San José </span> <span><IoMdArrowForward size={16} color="#7e7f7e" /> </span> <span> Heredia </span> </p>
                        <p className=" text-content1 text-sm font-medium border-e border-gray-200 ps-3 pe-3"> Saturday,  May 2, 2025 </p>
                        <p className="flex items-center ps-3 ">
                            <Clock className="h-4 w-4 mr-1 text-primary " />
                            <span className="text-sm text-[#000000]">11:30 AM</span>
                        </p>
                    </div>
                </div> 

                <div className="mt-4"> 
                    <Form> 
                        <Form.Item> 
                            <TextArea rows={4} style={{ resize: 'none' , backgroundColor: '#f4f7f4' , border: '1px solid #d6e2d6'}} className="w-full rounded-xl  p-4" placeholder="Write your review" />
                        </Form.Item> 

                        <Form.Item>  
                            <button className="  bg-primary text-white py-3 px-6  rounded-full"> Submit Review </button>
                            </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default CreateReview;