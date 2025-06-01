"use client";

import LoginWithGoogle from "@/components/shared/LoginWithGoogle";
import TextInput from "@/components/shared/TextInput";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { Checkbox, ConfigProvider, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { errorType } from "../../components/contact/SendMessage";

interface ValuesType {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [registerUser, { isLoading, isSuccess, isError, error, data }] = useRegisterUserMutation(); 
  const [email , setEmail] = React.useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      localStorage.setItem("userType", "register");
      router.push(`/verify-otp?email=${email}`);
    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data , email, router]);

  const onFinish = async (values: ValuesType) => {
    await registerUser(values)
    setEmail(values.email);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[23px] font-medium mb-2">Register Now</h1>
      </div>

      <LoginWithGoogle />

      <Divider style={{ borderColor: '#e6e6e6' }}> <span className="text-sm font-medium text-[#636363]"> Or </span></Divider>

      <ConfigProvider
        theme={{
          token: {
            borderRadius: 10,
          },
          components: {
            Input: {
              //   borderColor: "#d9d9d9",  
              hoverBorderColor: "#d9d9d9",
            },
          },
        }}
      >
        <Form onFinish={onFinish} layout="vertical">
          <TextInput name="name" label="Full Name" />
          <TextInput name="email" label="Email" />
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
            className="mb-5"
          >
            <Input.Password
              placeholder="Enter password"
              style={{
            height: 48,
            border: "1px solid #d9d9d9",
            outline: "none",
            boxShadow: "none",
            backgroundColor: "white",
          }}
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
            className="mb-10"
          >
            <Input.Password
              placeholder="Confirm password"
              style={{
            height: 48,
            border: "1px solid #d9d9d9",
            outline: "none",
            boxShadow: "none",
            backgroundColor: "white",
          }}
            />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator(_, value) {
                  return value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to continue!"));
                },
              },
            ]}
          >
            <Checkbox >
              I agree with terms of service and privacy policy
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full h-[45px] text-white font-medium text-lg bg-primary rounded-full flex items-center justify-center mt-4"
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>

      <div className="flex items-center justify-center gap-1 py-4">
        <p className="text-[#636363]">Have an account?</p>
        <Link href="/login" className="text-[#1854F9] font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
