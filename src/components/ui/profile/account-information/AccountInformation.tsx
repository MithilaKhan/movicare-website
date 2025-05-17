"use client";

import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { FiEdit3 } from "react-icons/fi";

const inputStyle = {
  height: 48,
  border: "1px solid #d9d9d9",
  outline: "none",
  boxShadow: "none",
  backgroundColor: "white",
  width: "100%",
};

const AccountInformation = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <p className="text-xl font-medium text-content1 pb-6">Account Information</p>

      <Form layout="vertical" className="w-full">
        <div className="flex lg:flex-row flex-col justify-between gap-6 border-b border-[#d8dbd9] pb-5 w-full">
          <Form.Item
            name="name"
            className="w-full"
            label={<p className="text-[#070707]/70 text-[14px]">Full Name</p>}
          >
            <Input
              placeholder="Enter your full name"
              style={inputStyle}
              suffix={<FiEdit3 size={20} color="#286a25" />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            className="w-full"
            label={<p className="text-[#070707]/70 text-[14px]">Email Address</p>}
          >
            <Input
              placeholder="Enter your email address"
              style={inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            className="w-full"
            label={<p className="text-[#070707]/70 text-[14px]">Phone Number</p>}
          >
            <Input
              placeholder="Enter your phone number"
              style={inputStyle}
              suffix={<FiEdit3 size={20} color="#286a25" />}
            />
          </Form.Item>
        </div>

        <div className="pt-12">
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

          <div className="flex lg:flex-row flex-col justify-between gap-6">
            <Form.Item
              name="newPassword"
              label={<p>New Password</p>}
              dependencies={["currentPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("currentPassword") === value) {
                      return Promise.reject(
                        new Error("The new password and current password do not match!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className="mb-5 w-full"
            >
              <Input.Password
                placeholder="Enter password"
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
                    return Promise.reject(
                      new Error("The new password that you entered does not match!")
                    );
                  },
                }),
              ]}
              className="mb-10 w-full"
            >
              <Input.Password
                placeholder="Enter password"
                style={inputStyle}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <div className="mt-5 flex items-center gap-5">
              <button type="submit" className="bg-primary text-white py-3 px-6 rounded-full">
                Change Password
              </button>
              <div className="text-sm text-content1">
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

export default AccountInformation;
