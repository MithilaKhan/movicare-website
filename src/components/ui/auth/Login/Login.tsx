"use client"

import LoginWithGoogle from "@/components/shared/LoginWithGoogle";
import TextInput from "@/components/shared/TextInput";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { Checkbox, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";
import Cookies from 'js-cookie';
import { userContext } from "@/helpers/UserProvider";

const Login = () => {
  const router = useRouter()
  const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginUserMutation();
  const [form] = Form.useForm(); 
  const userCtx = useContext(userContext);
  const refetch = userCtx?.refetch;

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message); 
      Cookies.set("accessToken", data?.data?.createToken || "");
      Cookies.set("refreshToken", data?.data?.refreshToken || "");
      localStorage.removeItem("resetToken");
      form.resetFields(); 
        setTimeout(() => {
      refetch?.();
      router.push("/");
    }, 200);

    }

    if (isError) {
      const errorMessage =
        (error as errorType)?.data?.errorMessages
          ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
          : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, router, form, refetch]);

  const onFinish = async (values: { email: string, password: string }) => {
    await loginUser(values)
  };

  return (
    <div >
      <div className=" mb-6">
        <h1 className="text-[23px] font-medium mb-2">Log in to your account </h1>
      </div>

      <LoginWithGoogle />

      <Divider style={{ borderColor: '#e6e6e6' }}> <span className="text-sm font-medium text-[#636363]"> Or </span></Divider>

      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >

        <TextInput name={"email"} label={"Email"} />

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 48,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none"
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item style={{ marginBottom: 0 }} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-primary font-semibold"
            href="/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            type="submit"
            style={{
              width: '100%',
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",

              marginTop: 20
            }}
            className="flex items-center justify-center bg-primary rounded-full"
          >
            {isLoading ? "Signing..." : "Sign in"}
          </button>
        </Form.Item>


      </Form>

      <div className=" flex items-center justify-center gap-1 py-4">
        <p className="text-[#636363]">Don’t have any account?</p>
        <Link href="/register" className="text-[#1854F9] font-semibold" > Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;