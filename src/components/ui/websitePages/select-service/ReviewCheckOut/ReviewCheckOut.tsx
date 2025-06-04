"use client";

import { DatePicker, Form, Input, Select } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineMyLocation } from "react-icons/md";
import { BookingDetails } from "../SelectServiceMainPage";
import moment from "moment";
import { useGetServicesQuery } from "@/redux/features/others/services/servicesSlice";
import { useCreateBookingMutation } from "@/redux/features/others/booking/bookingSlice";



const ReviewCheckOut = ({ prev, formData }: { prev: () => void, formData: BookingDetails }) => {
  const [form] = Form.useForm();
  const [formValid, setFormValid] = useState(false);
  const { data: allServices } = useGetServicesQuery(undefined); 
  const [createBooking] = useCreateBookingMutation();
  const servicesOption = allServices?.map((service) => ({
    value: service._id,
    label: service.name,
  })) || [];

const priceData = [
  {
    label: "Service",
    value: (formData?.service_charge).toFixed(2)
  },
  {
    label: "Base Fare",
    value: (formData?.base_fare).toFixed(2)
  },
  {
    label: "Additional Travelers",
    value: (formData?.additional_travelerse_fee).toFixed(2)
  },
  {
    label: "Taxes & Fees",
    value: (formData?.tax).toFixed(2)
  },
]


  // const additionalServicesOption = [
  //   { value: "Accessible Van Rentals", label: "Additional Service 1 ($100)" },
  //   { value: "Custom Route Planning", label: "Additional Service 2 ($100)" },
  //   { value: "Medical & Daily Transport", label: "Additional Service 3 ($100)" },
  //   { value: "Tour & Travel Assistance", label: "Additional Service 4 ($100)" },
  //   { value: "Corporate & Event Transport", label: "Additional Service 5 ($100)" },
  // ];  

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      form.setFieldsValue({
        service: formData.service,
        pickUpCity: formData.pickup_location,
        dropOffCity: formData.dropoff_location,
        date: formData.date ? moment(formData.date) : null,
        adults: formData.adults,
        kids: formData.kids,
        additionalInfo: formData.additional_info || "",

      });

      const values = form.getFieldsValue();
      const requiredFields = ["service", "pickUpCity", "dropOffCity", "date", "adults", "kids"];
      const allFilled = requiredFields.every(
        (field) => values[field] !== undefined && values[field] !== ""
      );
      setFormValid(allFilled);
    } else {
      form.resetFields();
      setFormValid(false);
    }
  }, [formData, form]);



  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const requiredFields = ["service", "pickUpCity", "dropOffCity", "date", "adults", "kids"];
    const allFilled = requiredFields.every(
      (field) => values[field] !== undefined && values[field] !== ""
    );
    setFormValid(allFilled);
  };

const onFinish = async() => {
  const values = form.getFieldsValue();

  const updatedData: BookingDetails = {
    ...formData,
    service: values.service,
    pickup_location: values.pickUpCity,
    dropoff_location: values.dropOffCity,
    date: values.date ? moment(values.date).format("YYYY-MM-DD") : "",
    adults: Number(values.adults),
    kids: Number(values.kids),
    additional_info: values.additionalInfo || "",
  };

 await createBooking(updatedData).then((res)=>console.log(res))
};

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full gap-4 mt-[56px]">
      <div className="bg-white border border-[#e0dfdf] lg:p-8 p-3 pb-4 rounded-lg lg:w-3/4 w-full">
        <Form
          layout="vertical"
          form={form}
          onValuesChange={onValuesChange}
          className="w-full h-auto" 
          onFinish={onFinish}
        >
          <div className="flex items-center gap-1 pb-6">
            <span onClick={() => prev()}>
              <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
            </span>
            <span className="lg:text-xl text-lg text-[#070707] font-medium">Choose Your Ride Option</span>
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

            <div className="flex lg:flex-row flex-col items-center gap-2">
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

            <div className="flex lg:flex-row flex-col items-center gap-2 mt-2">
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

            {/* <Form.Item
              name="additionalInfo"
              label={<p className="text-content2 text-sm">Additional info or special needs</p>}
            >
               <Select
                placeholder="Choose the type of transportation"
                className="w-full rounded-lg p-2"
                style={{ height: 45 }}
                options={additionalServicesOption}
                // suffixIcon={<FiEdit3 size={20} color="#286a25" />} 
              /> 
            </Form.Item> */}

            <Form.Item
              name="additionalInfo"
              label={<p className="text-content2 text-sm">Additional info or special needs</p>}
            >
              <Input
                type="text"
                placeholder="e.g., space for electric wheelchair, support companion, etc"
                style={{ height: "48px" }}
              />
            </Form.Item>
          </div>

          <Form.Item className="w-full">
            <button
              type="submit"
              className={`${formValid ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
                } text-white py-3 px-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
              disabled={!formValid}
            >
              Add To Cart
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className="lg:w-1/4 w-full">
        <div className=" bg-[#f0f3f1] border border-[#e0dfdf] p-8 rounded-lg h-[295px]">
          <p className="text-xl font-[#070707] font-medium">Price Details</p>
          <div className="flex flex-col gap-y-5 mt-4">
            {priceData.map((value, index) => (
              <div
                key={index}
                className={`flex justify-between items-center ${value?.label === "Taxes & Fees" ? "border-b border-dashed border-[#d8dbd9] pb-5" : ""
                  }`}
              >
                <p className="text-content2 text-sm">{value?.label}</p>
                <p className="text-[#070707] font-semibold text-sm">${value?.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3">
            <p className="text-content2 text-lg">Total</p>
            <p className="text-[#070707] font-semibold text-sm">${formData?.total_price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCheckOut;
