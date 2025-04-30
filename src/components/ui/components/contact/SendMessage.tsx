"use client";
import TextInput from "@/components/shared/TextInput";
import { Form, Input } from "antd";

const SendMessage = () => {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 pt-[56px] items-center">

            <div>
                <h2 className="text-[32px] font-semibold text-content1 mb-6">
                    Send Us a Message
                </h2>
                <p className="text-content2 mb-10 leading-8 text-[16px]">
                    We’re here to help! Fill out the form below, and we’ll get back to you as soon as possible.
                </p>
                <Form className="space-y-4" layout="vertical">
                    <TextInput name="name" label="Full Name" />
                    <TextInput name="email" label="Email" />

                    <Form.Item label={<p className="text-[#4E4E4E] text-[16px]">Message</p>} rules={[
                        {
                            required: true,
                            message: `Please enter your ${"Message".toLowerCase()}`,
                        },
                    ]}>
                        <Input.TextArea
                            placeholder="Your message"
                            name="message"

                            rows={5}
                            style={{
                                resize: "none",
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                padding: "8px",
                            }}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent resize-none"


                        />
                    </Form.Item>

                    <div className="flex justify-start mt-4">

                        <button
                            type="submit"
                            className="px-10 py-3 bg-primary text-white rounded-full  font-medium transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </div>

            <div>
                <img src="/contact.svg" alt="" className="w-full h-auto rounded-xl" />
            </div>
        </div>
    );
};

export default SendMessage;