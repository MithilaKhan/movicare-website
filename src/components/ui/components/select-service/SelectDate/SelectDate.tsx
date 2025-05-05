"use client";
import { Form, Input } from "antd";
import PriceDetails from "../PriceDetails";
import 'react-calendar/dist/Calendar.css';
import Calender from "./Calender";
const SelectDate = () => {
    const [form] = Form.useForm();

    const onFinish = () => {

    }
    return (
        <div className="flex w-full gap-4 mt-[56px]">
            <div className="bg-white border border-[#e0dfdf] p-8 rounded-lg w-3/4">

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    className="w-full h-auto"
                >
                    <p className="text-xl text-[#070707] font-medium pb-6">Select Your Service</p>

                    <div className="">
                        <Form.Item name="checkoutDate">
                         
          <div className=" border border-[#ebe9e9] rounded-lg p-8">
            <Calender unavailableDay={["2025-05-06", "2023-05-02"]} />
            <div className=" text-end  px-3 flex items-center  gap-4">
              <p className=" flex items-center  gap-1 py-2 ">
                <span className=" w-4 h-4 rounded-full bg-red-600"></span>{" "}
                <span className=" font-medium text-gray-500">Unavailable</span>
              </p>
            </div> 

            <div> 
                <p className=" text-sm text-[#525252] font-medium pt-4 ">Travel’s Time </p> 
                <div className="flex items-center gap-2 mt-2">
                    <Input type="number" className="w-1/2" placeholder="Hour" style={{ height: "48px"}}/>
                    <Input type="number" className="w-1/2" placeholder="Minute" style={{ height: "48px"}}/> 
                </div> 

                <p className=" text-[000000] text-[16px] pt-5 font-medium "> Choose the date and time for your trip, then select the service that best fits your needs </p>           
                </div>
          </div>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="adults"
                        label={<p className="text-content2 text-sm">Adults</p>}
                        className="mt-4"
                        rules={[{ required: true, message: "Please select a service" }]}
                    >
                         <Input type="number"  placeholder="Write adult number" style={{ height: "48px"}}/>
                    </Form.Item>

                    {/* <Form.Item className="mt-8 w-full">
                        <button
                            type="submit"
                            className={`${isServiceSelected ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
                                } text-white py-3 px-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
                            disabled={!isServiceSelected}
                        >
                            Choose Locations
                        </button>
                    </Form.Item> */}
                </Form>
            </div>

            {/* Price Details Panel */}
            <div className="w-1/4">
                <PriceDetails />
            </div>
        </div>
    );
};

export default SelectDate;