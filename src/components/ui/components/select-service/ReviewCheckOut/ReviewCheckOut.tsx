"use client";

import { DatePicker, Form, Input, Select } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineMyLocation } from "react-icons/md";
 

const priceData = [
    {
        label: "Service", 
        value:"400.00"
    }, 
    {
        label: "Base Fare", 
        value:"500.00"
    }, 
    {
        label: "Additional Travelers", 
        value:"240.00"
    }, 
    {
        label: "Taxes & Fees", 
        value:"93.00"
    }, 
]
const ReviewCheckOut = ({  prev }: { prev: () => void }) => {
  const [form] = Form.useForm();
  const [formValid, setFormValid] = useState(false);

  const servicesOption = [
    { value: "Accessible Van Rentals", label: "Accessible Van Rentals" },
    { value: "Custom Route Planning", label: "Custom Route Planning" },
    { value: "Medical & Daily Transport", label: "Medical & Daily Transport" },
    { value: "Tour & Travel Assistance", label: "Tour & Travel Assistance" },
    { value: "Corporate & Event Transport", label: "Corporate & Event Transport" },
  ];  


  const addtionalServicesOption = [
    { value: "Accessible Van Rentals", label: "Additional Service 1 ($100)" },
    { value: "Custom Route Planning", label: "Additional Service 2 ($100)" },
    { value: "Medical & Daily Transport", label: "Additional Service 3 ($100)" },
    { value: "Tour & Travel Assistance", label: "Additional Service 4 ($100)" },
    { value: "Corporate & Event Transport", label: "Additional Service 5 ($100)" },
  ]; 



  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const requiredFields = ["service", "pickUpCity", "dropOffCity", "date", "adults", "kids"];
    const allFilled = requiredFields.every(
      (field) => values[field] !== undefined && values[field] !== ""
    );
    setFormValid(allFilled);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form submitted:", values);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full gap-4 mt-[56px]">
      <div className="bg-white border border-[#e0dfdf] p-8 pb-4 rounded-lg w-3/4">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={onValuesChange}
          className="w-full h-auto"
        >
          <div className="flex items-center gap-1 pb-6">
            <span onClick={() => prev()}>
              <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
            </span>
            <span className="text-xl text-[#070707] font-medium">Choose Your Ride Option</span>
          </div>

          <div className=" pb-4">
            <Form.Item
              name="service"
              label={<p className="text-content2 text-sm">Service</p>}
              className="mt-4"
              rules={[{ required: true, message: "Please select a service" }]}
            >
              <Select
                placeholder="Choose the type of transportation"
                className="w-full rounded-lg p-2"
                style={{ height: 45 }}
                options={servicesOption}
                suffixIcon={<FiEdit3 size={20} color="#286a25" />}
              />
            </Form.Item>

            <div className="flex items-center gap-2">
              <Form.Item
                name="pickUpCity"
                label={<p className="text-content2 text-sm">Pick up city</p>}
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter pick up city" }]}
              >
                <Input
                  placeholder="Pick Up City"
                  style={{ height: 48 }}
                  suffix={<MdOutlineMyLocation size={20} color="#286a25" />}
                  className="w-1/2"
                />
              </Form.Item>

              <Form.Item
                name="dropOffCity"
                label={<p className="text-content2 text-sm">Drop-off city</p>}
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter drop-off city" }]}
              >
                <Input
                  placeholder="Drop-off city"
                  style={{ height: 48 }}
                  suffix={<MdOutlineMyLocation size={20} color="#286a25" />}
                  className="w-1/2"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="date"
              label={<p className="text-content2 text-sm">Date & Time</p>}
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker
                placeholder="Select date & time"
                className="w-full"
                style={{ height: "48px" }}
                suffixIcon={<FiEdit3 size={20} color="#286a25" />}
              />
            </Form.Item>

            <div className="flex items-center gap-2 mt-2">
              <Form.Item
                name="adults"
                label={<p className="text-content2 text-sm">Adults</p>}
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter number of adults" }]}
              >
                <Input
                  type="number"
                  placeholder="Write adult number"
                  style={{ height: "48px" }}
                  className="w-1/2"
                />
              </Form.Item>

              <Form.Item
                name="kids"
                label={<p className="text-content2 text-sm">Kids</p>}
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter number of kids" }]}
              >
                <Input
                  type="number"
                  placeholder="Write kids number"
                  style={{ height: "48px" }}
                  className="w-1/2"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="additionalInfo"
              label={<p className="text-content2 text-sm">Additional info or special needs</p>}
            >
               <Select
                placeholder="Choose the type of transportation"
                className="w-full rounded-lg p-2"
                style={{ height: 45 }}
                options={addtionalServicesOption}
                // suffixIcon={<FiEdit3 size={20} color="#286a25" />} 
              /> 
            </Form.Item>
          </div>

          <Form.Item className="w-full">
            <button
              type="button"
              className={`${
                formValid ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
              } text-white py-3 px-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
              onClick={handleSubmit}
              disabled={!formValid}
            >
              Add To Cart
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className="w-1/4">
      <div className=" bg-[#f0f3f1] border border-[#e0dfdf] p-8 rounded-lg h-[295px]">
        <p className="text-xl font-[#070707] font-medium">Price Details</p>
        <div className="flex flex-col gap-y-5 mt-4">
          {priceData.map((value , index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                value?.label === "Taxes & Fees" ? "border-b border-dashed border-[#d8dbd9] pb-5" : ""
              }`}
            >
              <p className="text-content2 text-sm">{value?.label}</p>
              <p className="text-[#070707] font-semibold text-sm">${value?.value}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3">
          <p className="text-content2 text-lg">Total</p>
          <p className="text-[#070707] font-semibold text-sm">$1700.00</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReviewCheckOut;
