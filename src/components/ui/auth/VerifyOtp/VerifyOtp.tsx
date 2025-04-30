"use client"
import {  Form, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import OTPInput from "react-otp-input";

const { Text } = Typography;

const VerifyOtp = () => { 
    const router = useRouter()
    const [otp, setOtp] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
      const emailFromQuery = new URLSearchParams(window.location.search).get('email');
      setEmail(emailFromQuery);
    }, []); 

    console.log(email);
  
    const onFinish = async(values:{otp:string}) => {  
        const userType = localStorage.getItem("userType")
        console.log(values); 
        if(userType === "forget"){
            router.push(`/reset-password`);
        }else{
            router.push(`/login`);
        }
    };
  
  
    const handleResendEmail = async() => {
  
    };
    return (
        <div>

        <div className=" mb-6">
          <h1 className="text-[25px] font-semibold mb-6 text-primary ">Verification code</h1>
          <p className=" ">We&apos;ll send a verification code to your email. Check your inbox and
            enter the code here.</p>
        </div>


        <Form layout="vertical" onFinish={onFinish}>

          <div className="flex items-center justify-center mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              inputStyle={{
                height: 50,
                width: 50,
                borderRadius: "8px",
                margin: "16px",
                fontSize: "20px",
                border: "1px solid #818181",
                color: "#2B2A2A",
                outline: "none",
                marginBottom: 10
              }}
              renderInput={(props) => <input {...props} />}
            />

          </div>

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
            Verify
            </button>
          </Form.Item>
        </Form>
    </div>
    );
};

export default VerifyOtp;