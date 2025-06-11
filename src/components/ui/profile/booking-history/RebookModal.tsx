"use client"
import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Calender from '../../websitePages/select-service/SelectDate/Calender';
import { useRebookBookingMutation } from '@/redux/features/others/booking/bookingSlice';
import { toast } from 'react-toastify';
import { errorType } from '../../websitePages/contact/SendMessage';
import moment from 'moment';

const RebookModal = ({ open, setOpen, date, id }: { open: boolean, setOpen: (open: boolean) => void, date: string, id: string }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [rebookBooking, { isLoading, isError, isSuccess, error, data }] = useRebookBookingMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setOpen(false)
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
      id: id,
      date: selectedDate,
      drop_date: moment(date).format("YYYY-MM-DD") 
    } 

    console.log(data, "data");
    await rebookBooking(data).then((res) => {
      console.log(res);
    });
  }


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
        <Calender unavailableDay={["2025-05-04", "2025-05-02"]} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div>
          <p className="text-sm text-[#525252] font-medium pt-4">Travel’s Time</p>

          <Form onFinish={onFinish}>
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

            <p className="text-[#000000] text-sm pt-5 font-medium">
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