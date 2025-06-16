"use client";
import { Form, Input, Select } from "antd";
import PriceDetails from "../PriceDetails";
import 'react-calendar/dist/Calendar.css';
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineMyLocation } from "react-icons/md";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import { useGetProviderByIdQuery, useGetServiceByIdQuery, useGetServicesQuery } from "@/redux/features/others/services/servicesSlice";
import { BookingDetails } from "../SelectServiceMainPage";
import { CiStopwatch } from "react-icons/ci";

const RideOption = ({ next, prev, updateFormData, formData }: { next: () => void; prev: () => void; updateFormData: (newData: Partial<BookingDetails>) => void, formData: BookingDetails }) => {
    const [form] = Form.useForm();
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [formValid, setFormValid] = useState(false);
    const { data: allServices } = useGetServicesQuery(undefined);
    const { data: allProviderServices } = useGetProviderByIdQuery(undefined);
    const { data: serviceDetails } = useGetServiceByIdQuery(serviceId || formData?.service || "");
    const [selectedRidePricing, setSelectedRidePricing] = useState<Partial<BookingDetails>>({});



    const servicesOption = allServices?.map((service) => ({
        value: service._id,
        label: service.name,
    })) || [];

    const carServices = allProviderServices?.data?.map((service) => ({
        id: service._id,
        title: service.name,
        description: service.description,
        price: service.price,
        features: service.facilities,
        image: "/class.svg",
        tax: service.service.taxs,
        adultPrice: service.service.adults_price,
        kidsPrice: service.service.kids_price,
        pricePerhour: service.service.price_per_hour,
        pricePerKm: service.service.price_per_km,
        servicePrice: service.service.service_price
    })) || [];

    const handleSelect = async (value: { id: string, tax: number, price: number, pricePerhour: number, pricePerKm: number, servicePrice: number }) => {
        try {
            await form.validateFields();

            const service_charge = serviceDetails?.service_price || 0;
            const base_fare =
                (formData?.distance * (serviceDetails?.price_per_km ?? 0)) +
                (formData?.duration * (serviceDetails?.price_per_hour ?? 0));
            const travelerCount = Math.max((formData?.adults + formData?.kids) - 1, 0);
            const additional_travelerse_fee = travelerCount * (value?.price ?? 0);
            const subTotal = service_charge + base_fare + additional_travelerse_fee;
            const tax = (subTotal * (serviceDetails?.taxs ?? 0)) / 100 + (serviceDetails?.fixed_price ?? 0);
            const total_price = subTotal + tax;

            const calculatedFields: Partial<BookingDetails> = {
                provider: value?.id,
                service_charge,
                base_fare,
                additional_travelerse_fee,
                tax,
                total_price,
            };

            setSelectedService(value?.id);
            setSelectedRidePricing(calculatedFields); 
            // updateFormData({
            //     ...formData,
            //     ...calculatedFields,
            // });
        } catch {
            
        }
    };

    const onValuesChange = () => {
        const values = form.getFieldsValue();
        const requiredFields = ["service", "pickUpCity", "dropOffCity", "date", "adults", "kids"];
        const allFilled = requiredFields.every(
            (field) => values[field] !== undefined && values[field] !== ""
        );
        setFormValid(allFilled);
    };

    const onFinish = (values: { service: string, pickUpCity: string, dropOffCity: string, date: string, adults: number, kids: number, additionalInfo: string }) => {
        const updatedData: BookingDetails = {
            ...formData,
            ...selectedRidePricing, 
            service: values.service,
            pickup_location: values.pickUpCity,
            dropoff_location: values.dropOffCity,
            date: values.date,
            adults: Number(values.adults),
            kids: Number(values.kids),
            additional_info: values.additionalInfo,
        };

        updateFormData(updatedData);
        setSelectedService(values.service);
        next();
    };

    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            form.setFieldsValue({
                service: formData.service,
                pickUpCity: formData.pickup_location,
                dropOffCity: formData.dropoff_location,
                date: formData.date ,
                adults: formData.adults,
                kids: formData.kids,
                additionalInfo: formData.additional_info || "",
            });

            setSelectedService(formData.service);
            setServiceId(formData.service);

            const values = form.getFieldsValue();
            const requiredFields = ["service", "pickUpCity", "dropOffCity", "date", "adults", "kids"];
            const allFilled = requiredFields.every(
                (field) => values[field] !== undefined && values[field] !== ""
            );
            setFormValid(allFilled);
        } else {
            form.resetFields();
            setFormValid(false);
        }
    }, [formData, form]);

    return (
        <div className="flex lg:flex-row flex-col-reverse w-full gap-4 mt-[56px]">
            <div className="bg-white border border-[#e0dfdf] lg:p-8 p-3 pb-4 rounded-lg lg:w-3/4 w-full">
                <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    className="w-full h-auto"
                    onFinish={onFinish}
                >
                    <div className="flex items-center gap-1 pb-6">
                        <span onClick={() => prev()}>
                            <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
                        </span>
                        <span className="text-xl text-[#070707] font-medium">
                            Choose Your Ride Option
                        </span>
                    </div>

                    <div className="border-b border-dashed border-[#c5c4c4] pb-4">
                        <Form.Item
                            name="service"
                            label={<p className="text-content2 text-sm">Service</p>}
                            className="mt-4"
                            rules={[{ required: true, message: "Please select a service" }]}
                        >
                            <Select
                                placeholder="Choose the type of transportation"
                                className="w-full rounded-lg p-2"
                                style={{ height: 45 }}
                                options={servicesOption}
                                onChange={(value) => setServiceId(value)}
                                suffixIcon={<FiEdit3 size={20} color="#286a25" />}
                            />
                        </Form.Item>

                        <div className="flex lg:flex-row flex-col items-center gap-2">
                            <Form.Item
                                name="pickUpCity"
                                label={<p className="text-content2 text-sm">Pick up city</p>}
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Please enter pick up city" }]}
                            >
                                <Input
                                    placeholder="Pick Up City"
                                    style={{ height: 48 }}
                                    suffix={<MdOutlineMyLocation size={20} color="#286a25" />}
                                    className="w-1/2"
                                    readOnly
                                />
                            </Form.Item>

                            <Form.Item
                                name="dropOffCity"
                                label={<p className="text-content2 text-sm">Drop-off city</p>}
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Please enter drop-off city" }]}
                            >
                                <Input
                                    placeholder="Drop-off city"
                                    style={{ height: 48 }}
                                    suffix={<MdOutlineMyLocation size={20} color="#286a25" />}
                                    className="w-1/2"
                                    readOnly
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="date"
                            label={<p className="text-content2 text-sm">Date & Time</p>}
                            rules={[{ required: true, message: "Please select a date" }]}
                        >

                            <Input
                                placeholder="Select date & time"
                                style={{ height: 48 }}
                                suffix={<CiStopwatch size={24} color="#286a25" />}
                                className="w-full"
                                readOnly
                            />
                        </Form.Item>

                        <div className="flex lg:flex-row flex-col items-center gap-2 mt-2">
                            <Form.Item
                                name="adults"
                                label={<p className="text-content2 text-sm">Adults</p>}
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Please enter number of adults" }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Write adult number"
                                    style={{ height: "48px" }}
                                    className="w-1/2"
                                    
                                />
                            </Form.Item>

                            <Form.Item
                                name="kids"
                                label={<p className="text-content2 text-sm">Kids</p>}
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Please enter number of kids" }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Write kids number"
                                    style={{ height: "48px" }}
                                    className="w-1/2"

                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="additionalInfo"
                            label={<p className="text-content2 text-sm">Additional info or special needs</p>}
                        >
                            <Input
                                type="text"
                                placeholder="e.g., space for electric wheelchair, support companion, etc"
                                style={{ height: "48px" }}
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        {carServices.map((service) => {
                            const isSelected = selectedService === service.id;
                            return (
                                <div key={service.id} className="bg-[#f5f5f5] rounded-lg shadow-sm overflow-hidden">
                                    <div className="lg:p-6 p-3">
                                        <div className="mb-4">
                                            <Image
                                                src={service.image}
                                                alt={`${service.title} car`}
                                                width={500}
                                                height={200}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>

                                        <h2 className="lg:text-xl text-lg font-medium text-[#000000] mb-1">{service.title}</h2>
                                        <p className="text-content2 mb-2 lg:text-[18px] text-[16px]">{service.description}</p>

                                        <div className="space-y-2 mb-6">
                                            {service.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <BsPatchCheckFill color="#286a25" size={18} />
                                                    <span className="text-content3 text-[16px]">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-lg font-medium">${service.price} Per Traveler</div>
                                            <button
                                                type="button"
                                                className={`rounded-full h-12 px-12 text-white text-[16px] transition-colors duration-300 ${formValid ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
                                                    }`}
                                                onClick={() => formValid && handleSelect(service)}
                                                disabled={!formValid}
                                            >
                                                {isSelected ? "✓ Selected" : "Choose"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Form.Item>
                        <div className="flex justify-end">

                            <button
                                type="submit"
                                className={`rounded-full h-12 px-12 text-white text-[16px] transition-colors duration-300  bg-primary `}
                            >
                                Continue
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </div>

            <div className="lg:w-1/4 w-full">
                <PriceDetails />
            </div>
        </div>
    );
};

export default RideOption;
