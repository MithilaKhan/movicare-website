"use client"
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ResetPassword = () => { 
    const router = useRouter()

    const onFinish = async(values:{newPassword:string , confirmPassword:string}) => { 
      console.log(values);
      router.push(`/login`);
    }; 

    return (
        <div>

        <div className=" mb-6">
          <h1 className="text-[25px] font-semibold text-primary ">Reset Password</h1>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

            <Form.Item
              name="newPassword" 
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>       
           
            <Form.Item
              style={{ marginBottom: 0 }} 
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The new password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter Confirm password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>
      

            <Form.Item>
            <button
             
              type="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
           
                marginTop: 10
              }}
              className="flex items-center justify-center bg-primary rounded-full"
            >
            Update
            </button>
          </Form.Item>


         
        </Form>


    </div>
    );
};

export default ResetPassword;