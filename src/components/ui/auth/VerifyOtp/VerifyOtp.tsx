"use client"
import { useForgetPasswordMutation, useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import { ConfigProvider, Form, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";
import Cookies from "js-cookie";
const { Text } = Typography;

const VerifyOtp = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [verifyEmail, {
    isLoading,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
    data: verifyData
  }] = useVerifyEmailMutation();

  const [forgetPassword, {
    isSuccess: isForgetSuccess,
    isError: isForgetError,
    error: forgetError,
    data: forgetData
  }] = useForgetPasswordMutation();


  useEffect(() => {
    const emailFromQuery = new URLSearchParams(window.location.search).get('email');
    setEmail(emailFromQuery);

    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  useEffect(() => {
    if (isVerifySuccess) {
      toast.success(verifyData?.message);
      if (userType === "register") {
        router.push("/login")
      }
      if (userType === "forget") {
        Cookies.set("resetToken", verifyData?.data || "", {
          expires: 1,
          path: "/",
        });
        router.push("/reset-password");
      }

      form.resetFields();
    }
    if (isVerifyError) {
      const errorMessage =
        (verifyError as errorType)?.data?.errorMessages?.map((msg: { message: string }) => msg.message).join("\n") ||
        (verifyError as errorType)?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isVerifySuccess, isVerifyError, verifyError, verifyData, router, userType, form]);

  useEffect(() => {
    if (isForgetSuccess) {
      toast.success(forgetData?.message);
    }
    if (isForgetError) {
      const errorMessage =
        (forgetError as errorType)?.data?.errorMessages?.map((msg: { message: string }) => msg.message).join("\n") ||
        (forgetError as errorType)?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }, [isForgetSuccess, isForgetError, forgetError, forgetData]);


  const onFinish = async (values: { otp: string }) => {

    const data = {
      oneTimeCode: parseInt(values.otp),
      email: email
    }

    await verifyEmail(data).then((res) => {
      console.log(res);
    });

    // form.resetFields(); 

  };


  const handleResendEmail = async () => {
    await forgetPassword({ email: email }).then((res) => {
      console.log(res);
    });

  };

  return (
    <div>

      <div className=" mb-6">
        <h1 className="text-[25px] font-semibold mb-6 text-primary ">Verification code</h1>
        <p className=" ">We&apos;ll send a verification code to your email. Check your inbox and
          enter the code here.</p>
      </div>


      <Form onFinish={onFinish} layout="vertical" className=' w-full mx-auto' form={form}>

        <ConfigProvider
          theme={{
            components: {
              Input: {
                // lineHeight: 3,
                controlHeight: 65,
                hoverBorderColor: "#286a25",
                activeBorderColor: "#286a25",
                borderRadius: 10,
              },
            },
            token: {
              colorPrimary: '#286a25',
              colorBorder: "#286a25",
            },
          }}
        >
          <Form.Item
            className="flex items-center justify-center mx-auto "
            name="otp"
            rules={[{ required: true, message: 'Please input otp code here!' }]}
          >
            <Input.OTP
              style={{
                width: 300,
                height: 50,

              }}
              className=""
              variant="filled"
              length={4}
            />
          </Form.Item>
        </ConfigProvider>

        <div className="flex items-center justify-between mb-6 ">
          <Text>Don&apos;t received code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot underline font-medium"
            style={{ color: "#00B047", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

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
            {isLoading ? "verifying..." : "Verify"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;