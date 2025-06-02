"use client"
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";

const ForgetPassword = () => {
  const router = useRouter()
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string | null>(null);
  const [forgetPassword, {
    isLoading,
    isSuccess,
    isError,
    error,
    data
  }] = useForgetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      form.resetFields();
      localStorage.setItem("userType", "forget")
      router.push(`/verify-otp?email=${email}`);
    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, router, form, email]);

  const onFinish = async (values: { email: string }) => {
    setEmail(values.email);
    await forgetPassword(values).then((res) => {
      console.log(res);
    })

  };

  return (
    <div>

      <div className="text-center mb-4">
        <h1 className="text-[23px] font-medium ">Forgot Password ?</h1>
      </div>

      <Form layout="vertical" onFinish={onFinish}>

        <Form.Item
          name="email"
          id="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
            style={{
              height: 48,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none"
            }}
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
            {isLoading ? "sending..." : "Send OTP"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;