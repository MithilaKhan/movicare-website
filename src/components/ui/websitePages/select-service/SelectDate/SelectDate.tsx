"use client";
import { Form, Input } from "antd";
import PriceDetails from "../PriceDetails";
import 'react-calendar/dist/Calendar.css';
import Calender from "./Calender";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { BookingDetails } from "../SelectServiceMainPage";

const SelectDate = ({ next, prev, updateFormData , formData}: { next: () => void; prev: () => void, updateFormData: (newData: Partial<BookingDetails>) => void , formData: BookingDetails }) => {
  const [form] = Form.useForm();
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const requiredFields = ["checkoutDate", "hour", "minute", "adults", "kids"];
    const allFilled = requiredFields.every((field) => values[field] !== undefined && values[field] !== "");
    setIsServiceSelected(allFilled);
  }; 

    useEffect(() => {

    if (formData?.date || formData?.adults || formData?.kids) {

      form.setFieldsValue({ adults: formData.adults, kids: formData.kids}); 
      setSelectedDate(formData.date);

      const values = form.getFieldsValue();
      setIsServiceSelected(!!values.adults && !!values.kids);

    }
  }, [form, formData]);

  const onFinish = (values: { checkoutDate: string, hour: string, minute: string, adults: string, kids: string }) => {

    updateFormData({
      date: selectedDate,
      adults: Number(values.adults),
      kids: Number(values.kids)
    });
    next();
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full gap-4 mt-[56px]">
      <div className="bg-white border border-[#e0dfdf] lg:p-8 p-2 pb-4 rounded-lg lg:w-3/4 w-full">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          className="w-full h-auto"
        >
          <div className="flex items-center gap-1 pb-6">
            <span onClick={() => prev()}>
              <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
            </span>
            <span className="text-xl text-[#070707] font-medium">
              Select Date & Travelers
            </span>
          </div>

          <Form.Item
            name="checkoutDate"
          // rules={[{ required: true, message: "Please select a date" }]}
          >
            <div className="border border-[#ebe9e9] rounded-lg lg:p-8 p-2">
              <Calender unavailableDay={["2025-05-04", "2025-05-02"]} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

              <div>
                <p className="text-sm text-[#525252] font-medium pt-4">Travel’s Time</p>
                <div className="flex lg:flex-row flex-col items-center gap-2 mt-2">
                  <Form.Item
                    name="hour"
                    noStyle
                    rules={[{ required: true, message: "Please enter hour" }]}
                  >
                    <Input type="number" placeholder="Hour" className="w-1/2" style={{ height: "48px" }} />
                  </Form.Item>
                  <Form.Item
                    name="minute"
                    noStyle
                    rules={[{ required: true, message: "Please enter minute" }]}
                  >
                    <Input type="number" placeholder="Minute" className="w-1/2" style={{ height: "48px" }} />
                  </Form.Item>
                </div>
                <p className="text-[#000000] lg:text-[16px] text-sm pt-5 font-medium">
                  Choose the date and time for your trip, then select the service that best fits your needs
                </p>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="adults"
            label={<p className="text-content2 text-sm">Adults</p>}
            className="mt-4"
            rules={[{ required: true, message: "Please select a Adults number" }]}
          >
            <Input type="number" placeholder="Write adult number" style={{ height: "48px" }} />
          </Form.Item>

          <Form.Item
            name="kids"
            label={<p className="text-content2 text-sm">Kids</p>}
            className="mt-4"
            rules={[{ required: true, message: "Please select a kids number" }]}
          >
            <Input type="number" placeholder="Write kids number" style={{ height: "48px" }} />
          </Form.Item>

          {/* <p className="lg:text-[17px] text-sm text-[#000000] mb-8">
            Each <span className="font-medium"> adult costs $300 </span>, and each <span className="font-medium"> child (under 12) costs $150 </span>. Wheelchair users are accommodated with no additional charge.
          </p> */}

          <Form.Item className=" w-full">
            <button
              type="submit"
              className={`${isServiceSelected ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
                } text-white py-3 px-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
              disabled={!isServiceSelected}
            >
              See Result
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className="lg:w-1/4 w-full">
        <PriceDetails />
      </div>
    </div>
  );
};

export default SelectDate;
