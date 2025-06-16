"use client";
import { Form, Input, Select } from "antd";
import PriceDetails from "../PriceDetails";
import 'react-calendar/dist/Calendar.css';
import Calender from "./Calender";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { BookingDetails } from "../SelectServiceMainPage";
import { useAllTimeSlotsQuery, useCheckSlotsMutation, useUnavailableDateSlotQuery } from "@/redux/features/others/booking/bookingSlice";
import { toast } from "react-toastify";
import { errorType } from "../../contact/SendMessage";
import moment from "moment";

const SelectDate = ({ next, prev, updateFormData, formData }: { next: () => void; prev: () => void, updateFormData: (newData: Partial<BookingDetails>) => void, formData: BookingDetails }) => {
  const [form] = Form.useForm();
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const { data: allUnavailableDates } = useUnavailableDateSlotQuery(undefined);
  const { data: timeSlots } = useAllTimeSlotsQuery(selectedDate || "");
  const [checkSlots, { isError, isSuccess, error, data }] = useCheckSlotsMutation();

  useEffect(() => {
    if (isSuccess) {
      const endTime = moment(data?.data?.end).format('HH:mm A');
      setEndTime(endTime)
    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, form]);


  const handleStartTimeChange = async (value: string) => {
    const data = {
      date: selectedDate,
      time: value,
      dropoff_location: formData.dropoff_location,
      pickup_location: formData.pickup_location,
    }

    await checkSlots(data)

  }

  const StartTimeOption = timeSlots?.data?.map((timeSlot: { time: string; available: boolean }) => {
    const formattedTime = timeSlot.time.replace(/:\d{2}\s/, ' ');
    return {
      label: formattedTime,
      value: timeSlot.time,
      disabled: !timeSlot.available,
    };
  });


  const onValuesChange = () => {
    const values = form.getFieldsValue();
    const requiredFields = [ "pickup_time", "endTime", "adults", "kids"];
    const allFilled = requiredFields.every((field) => values[field] !== undefined && values[field] !== "");
    setIsServiceSelected(allFilled);
  };

  useEffect(() => {

    if (formData?.date || formData?.adults || formData?.kids || formData?.pickup_time) {
      form.setFieldsValue({ adults: formData.adults, kids: formData.kids , pickup_time: formData.pickup_time , endTime: formData.dropOff_time });
      setSelectedDate(formData.date ? moment(formData.date).format('YYYY-MM-DD') : null); 

      const values = form.getFieldsValue();
      setIsServiceSelected(!!values.adults && !!values.kids);

    }
  }, [form, formData]);

  useEffect(() => {
    if (endTime) {
      form.setFieldsValue({ endTime: endTime });
    }
  }, [endTime, form]);

  const onFinish = (values: { pickup_time: string, endTime: string, adults: string, kids: string }) => {

    updateFormData({
      date: selectedDate,
      adults: Number(values.adults),
      kids: Number(values.kids),
      pickup_time: values.pickup_time,
      dropOff_time: values.endTime
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
           
          // rules={[{ required: true, message: "Please select a date" }]}
          >
            <div className="border border-[#ebe9e9] rounded-lg lg:p-8 p-2">
              <Calender unavailableDay={allUnavailableDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

              <div>
                <p className="text-lg text-[#525252] font-medium pt-4 pb-2">Travel’s Time</p>
                <div className="flex lg:flex-row flex-col items-center gap-2 mt-2 w-full">
                  <Form.Item
                    name="pickup_time"
                    className="w-full"
                    rules={[{ required: true, message: "Please enter hour" }]}
                    label={<p className="text-[#525252]  text-sm font-medium">Start Time</p>}
                  >
                    <Select
                      placeholder="Start Time"
                      className="w-1/2  rounded-lg p-2"
                      style={{ height: 48 }}
                      options={StartTimeOption}
                      onChange={(value) => {
                        handleStartTimeChange(value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="endTime"
                    className="w-full"
                    rules={[{ required: true, message: "Please enter minute" }]}
                    label={<p className="text-[#525252]  text-sm font-medium">End Time</p>}
                  >
                    <Input type="text"  placeholder="Minute" className="w-1/2" style={{ height: "48px" }} readOnly />
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
