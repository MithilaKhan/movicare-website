"use client"
import { Form, Select } from "antd";
import { useState } from "react";
import PriceDetails from "../PriceDetails";
import { useGetServicesQuery } from "@/redux/features/others/services/servicesSlice";
import { BookingDetails } from "../SelectServiceMainPage";

const SelectServiceStep = ({ next , updateFormData }: { next: () => void  , updateFormData: (newData: Partial<BookingDetails>) => void}) => {
    const [form] = Form.useForm();
    const [isServiceSelected, setIsServiceSelected] = useState(false);  
    const {data:allServices} = useGetServicesQuery(undefined);   
    console.log("allServices", allServices); 

    const servicesOption = allServices?.map((service) => ({
        value: service._id,
        label: service.name,
    })) || [];

    const onValuesChange = (allValues: { service: string }) => {
        setIsServiceSelected(!!allValues.service); 
      
    };

    const onFinish = (values:{service:string}) => { 
           updateFormData({ service: values.service });
        next();
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse w-full gap-4 mt-[56px] lg:mb-0 mb-5">
            <div className="bg-white border border-[#e0dfdf] p-8 pb-0 rounded-lg lg:w-3/4 w-full">
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    className="w-full h-auto"
                >
                    <p className="text-xl text-[#070707] font-medium pb-6">Select Your Service</p>

                    <Form.Item
                        name="service"
                        label={<p className="text-content2 text-sm">Services</p>}
                        className="mt-4 "
                        rules={[{ required: true, message: "Please select a service" }]}
                    >
                        <Select
                            placeholder="Choose the type of transportation"
                            className="w-full  rounded-lg p-2"
                            style={{ height: 45 }}
                            options={servicesOption}
                        />
                    </Form.Item>

                    <Form.Item className=" w-full">
                        <button
                            type="submit"
                            className={`${isServiceSelected ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
                                } text-white py-3 px-6 mt-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
                            disabled={!isServiceSelected}
                        >
                            Choose Locations
                        </button>
                    </Form.Item>
                </Form>
            </div>

            {/* Price Details Panel */}
            <div className="lg:w-1/4 w-full">
                <PriceDetails />
            </div>
        </div>
    );
};

export default SelectServiceStep;
