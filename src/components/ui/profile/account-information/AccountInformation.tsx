"use client";

import { userContext } from "@/helpers/UserProvider";
import { imageUrl } from "@/redux/base/baseApi";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";
import { errorType } from "../../websitePages/contact/SendMessage";
import ChangePassword from "./ChangePassword";

const inputStyle = {
  height: 48,
  border: "1px solid #d9d9d9",
  outline: "none",
  boxShadow: "none",
  backgroundColor: "white",
  width: "100%",
};

const AccountInformation = () => {
  const [profileForm] = Form.useForm();
  const userContextValue = useContext(userContext)
  const user = userContextValue?.user
  const [imgURL, setImgURL] = useState("");
  const [imgFile, setImageFile] = useState<File | null>(null);
  const [updateProfile, { isLoading, isSuccess, isError, error, data }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        name: user?.name,
        email: user?.email,
        contact: user?.contact
      });
      setImgURL(user?.image?.startsWith("http") ? user?.image : `${imageUrl}${user?.image}`)
    }
  }, [profileForm, user]);

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

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImgURL(imgUrl);
      setImageFile(file)
    }
  };

  const onProfileFinish = async (values: { name: string, email: string, contact: string }) => {
    const formData = new FormData();

    if (imgFile) {
      formData.append("image", imgFile);
    }
    formData.append("name", values?.name);
    formData.append("email", values?.email);
    formData.append("contact", values?.contact);

    await updateProfile(formData).unwrap()
  }




  return (
    <div className="w-full">
      <p className="text-xl font-medium text-content1 ">Account Information</p>

      <div className="flex  py-3">
        <input
          onChange={onChange}
          type="file"
          id="img"
          className="hidden"
        />
        <label
          htmlFor="img"
          className="relative w-[120px] h-[120px] cursor-pointer rounded-full  bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${imgURL})` }}
        >
          <div
            className="absolute bottom-1 -right-1 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center"
          >
            <AiOutlineEdit size={20} className="text-primary" />
          </div>
        </label>
      </div>

      {/* // Profile Update Form  */}
      <Form layout="vertical" className="w-full border-b border-[#d8dbd9] lg:pb-5" form={profileForm} onFinish={onProfileFinish}>
        <div className="flex lg:flex-row flex-col justify-between lg:gap-6  w-full">
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
              readOnly
            />
          </Form.Item>

          <Form.Item
            name="contact"
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

        <Form.Item>
          <div className=" flex lg:justify-end justify-center">
            <button type="submit" className="bg-primary text-white py-3 lg:px-6 px-4 rounded-full lg:text-[16px] text-sm">
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </Form.Item>

      </Form>

      {/* Change Password Form */}
      <ChangePassword />
    </div>
  );
};

export default AccountInformation;
