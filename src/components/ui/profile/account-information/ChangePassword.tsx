"use client";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";

const inputStyle = {
    height: 48,
    border: "1px solid #d9d9d9",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "white",
    width: "100%",
};
const ChangePassword = () => {
    const router = useRouter();
    const [passwordForm] = Form.useForm(); 
    const [changePassword, { isLoading, isSuccess, isError, error, data }] = useChangePasswordMutation(); 

     useEffect(() => {
        if (isSuccess) {
          toast.success(data?.message);
        }
    
        if (isError) {
          const errorMessage =
            (error as errorType)?.data?.errorMessages
              ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
              : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
          toast.error(errorMessage);
        }
      }, [isSuccess, isError, error, data]); 

    const onPasswordFinish = async (values: { currentPassword: string, newPassword: string }) => {
        await changePassword(values).then((res) => {
            console.log(res);
        })
    }
    return (
        <div>
            <Form layout="vertical" className="w-full mt-10" form={passwordForm} onFinish={onPasswordFinish}>
                <div className="lg:pt-5 pt-2">
                    <Form.Item
                        name="currentPassword"
                        label={<p>Current Password</p>}
                        rules={[{ required: true, message: "Please input your current password!" }]}
                        className="mb-5"
                    >
                        <Input.Password
                            placeholder="Enter Password"
                            style={inputStyle}
                        />
                    </Form.Item>

                    <div className="flex lg:flex-row flex-col justify-between lg:gap-6">
                        <Form.Item
                            name="newPassword"
                            label={<p>New Password</p>}
                            dependencies={["currentPassword"]}
                            hasFeedback
                            rules={[
                                { required: true, message: "Please input your new password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("currentPassword") === value) {
                                            return Promise.reject(new Error("New password must be different from current password!"));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                            className="mb-5 w-full"
                        >
                            <Input.Password
                                placeholder="Enter new password"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={<p>Re-Type Password</p>}
                            dependencies={["newPassword"]}
                            hasFeedback
                            rules={[
                                { required: true, message: "Please confirm your password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("The new password that you entered does not match!"));
                                    },
                                }),
                            ]}
                            className="mb-10 w-full"
                        >
                            <Input.Password
                                placeholder="Confirm new password"
                                style={inputStyle}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <div className="mt-5 flex items-center lg:justify-start justify-between lg:gap-5">
                            <button type="submit" className="bg-primary text-white py-3 lg:px-6 px-4 rounded-full lg:text-[16px] text-sm">
                            {isLoading ? "Changing..." : "Change Password"} 
                            </button>
                            <div className="lg:text-sm text-xs text-content1">
                                <span>Forgot Your Password?</span>{" "}
                                <span
                                    className="text-primary font-medium cursor-pointer"
                                    onClick={() => router.push("/forgot-password")}
                                >
                                    Reset Password
                                </span>
                            </div>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;