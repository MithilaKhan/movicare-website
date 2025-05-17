import {  Form, Input, Modal } from 'antd';
import React from 'react';
import Calender from '../../components/select-service/SelectDate/Calender';

const RebookModal = ({open , setOpen}:{open:boolean, setOpen:(open:boolean)=>void}) => {
    return (
         <Modal
        title={<p className='text-xl font-medium text-content1 pb-4'>Select Your New Date</p> }
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onCancel={() => setOpen(false)} 
        footer={false} 
        centered
      >
        

        <div className='border border-gray-300 p-4 rounded-xl'> 
           <Calender unavailableDay={[]} />  
                 <div>
                <p className="text-sm text-[#525252] font-medium pt-4">Travel’s Time</p>  

                <Form> 
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
                </Form>
                <p className="text-[#000000] text-sm pt-5 font-medium">
                 Choose  the new date and time for your trip, then select rebook
                </p>
              </div> 
        </div>
 
 <div className='mt-4'>
    <button className='w-full bg-primary text-white py-3 rounded-full text-sm'> Rebook </button>
 </div>
      </Modal> 
    );
};

export default RebookModal;