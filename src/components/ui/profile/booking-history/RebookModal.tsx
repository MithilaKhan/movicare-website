"use client"
import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Calender from '../../websitePages/select-service/SelectDate/Calender';
import { useAllTimeSlotsQuery, useCheckSlotsMutation, useRebookBookingMutation, useUnavailableDateSlotQuery } from '@/redux/features/others/booking/bookingSlice';
import { toast } from 'react-toastify';
import { errorType } from '../../websitePages/contact/SendMessage';
import moment from 'moment';
import { BookingCardProps } from '../current-booking/CurrentBooking';
import { useRouter } from 'next/navigation';

const RebookModal = ({ open, setOpen, booking }: { open: boolean, setOpen: (open: boolean) => void, booking: BookingCardProps }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [rebookBooking, { isLoading, isError, isSuccess, error, data }] = useRebookBookingMutation();
  const { data: allUnavailableDates } = useUnavailableDateSlotQuery(undefined);
  const { data: timeSlots } = useAllTimeSlotsQuery(selectedDate || "");
  const [form] = Form.useForm();
  const router = useRouter()

  const [checkSlots, {
    isError: isCheckSlotsError,
    isSuccess: isCheckSlotsSuccess,
    error: checkSlotsErrorData,
    data: checkSlotsData
  }] = useCheckSlotsMutation();

  useEffect(() => {
    if (isCheckSlotsSuccess) {
      const endTime = moment(checkSlotsData?.data?.end).format('HH:mm A');
      setEndTime(endTime);
    }

    if (isCheckSlotsError) {
      const errorMessage =
        (checkSlotsErrorData as errorType)?.data?.errorMessages
          ? (checkSlotsErrorData as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg.message).join("\n")
          : (checkSlotsErrorData as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isCheckSlotsSuccess, isCheckSlotsError, checkSlotsData, checkSlotsErrorData]);

  const handleStartTimeChange = async (value: string) => {
    const data = {
      date: selectedDate,
      time: value,
      dropoff_location: booking.destination,
      pickup_location: booking.origin,
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


  useEffect(() => {
    if (isSuccess) {

      setOpen(false)
      router.push(data?.data)
    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, setOpen]);

  const onFinish = async () => {
    const data = {
      id: booking?.id,
      date: selectedDate,
      pickup_time: form.getFieldValue('pickup_time'),
    }

    console.log(data, "data");
    await rebookBooking(data).then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    if (endTime) {
      form.setFieldsValue({ endTime: endTime });
    }
  }, [endTime, form]);

  return (
    <Modal
      title={<p className='text-xl font-medium text-content1 pb-4'>Select Your New Date</p>}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      centered
    >

      <div className='border border-gray-300 p-4 rounded-xl'>
        <Calender unavailableDay={allUnavailableDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div>


          <Form onFinish={onFinish} layout='vertical' form={form}>
            <div>
              <p className="text-[16px] text-[#525252] font-medium pt-4 pb-0">Travel’s Time</p>
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
                  <Input type="text" placeholder="Minute" className="w-1/2" style={{ height: "48px" }} readOnly />
                </Form.Item>
              </div>
            </div>

            <p className="text-[#000000] text-sm pb-5 font-medium">
              Choose the new date and time for your trip, then select rebook
            </p>

            <Form.Item className='mt-4'>
              <button typeof='submit' className='w-full bg-primary text-white py-3 rounded-full text-sm' type="submit"> {isLoading ? "Loading..." : "Rebook"}</button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default RebookModal;