"use client";
import { DatePicker, Form, Input, Select } from "antd";
import PriceDetails from "../PriceDetails";
import 'react-calendar/dist/Calendar.css';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineMyLocation } from "react-icons/md";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";

interface CarService {
    id: string;
    title: string;
    description: string;
    price: number;
    features: string[];
    image: string;
}

const carServices: CarService[] = [
    {
        id: "economy",
        title: "Economy Class",
        description: "Affordable comfort for budget-conscious travelers",
        price: 120,
        features: [
            "A/C and bottled water included",
            "Comfortable seating for a smooth ride",
            "Experienced and friendly driver",
        ],
        image: "/class.svg",
    },
    {
        id: "vip",
        title: "Vip Class",
        description: "Luxury and extra comfort for premium travelers",
        price: 180,
        features: [
            "Personalized assistance from trained staff",
            "Complimentary Wi-Fi and refreshments",
            "Experienced and friendly driver",
        ],
        image: "/class.svg",
    },
];

const RideOption = ({ next, prev }: { next: () => void; prev: () => void }) => {
    const [form] = Form.useForm();
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [formValid, setFormValid] = useState(false);

    const servicesOption = [
        { value: "Accessible Van Rentals", label: "Accessible Van Rentals" },
        { value: "Custom Route Planning", label: "Custom Route Planning" },
        { value: "Medical & Daily Transport", label: "Medical & Daily Transport" },
        { value: "Tour & Travel Assistance", label: "Tour & Travel Assistance" },
        { value: "Corporate & Event Transport", label: "Corporate & Event Transport" },
    ];

    const handleSelect = async (id: string) => {
        const values = await form.validateFields().catch(() => null);
        if (values) {
            setSelectedService(id);
            next(); // proceed only when form is valid and a service is selected
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

    return (
        <div className="flex w-full gap-4 mt-[56px]">
            <div className="bg-white border border-[#e0dfdf] p-8 pb-4 rounded-lg w-3/4">
                <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    className="w-full h-auto"
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
                                suffixIcon={<FiEdit3 size={20} color="#286a25" />}
                            />
                        </Form.Item>

                        <div className="flex items-center gap-2">
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
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="date"
                            label={<p className="text-content2 text-sm">Date & Time</p>}
                            rules={[{ required: true, message: "Please select a date" }]}
                        >
                            <DatePicker
                                placeholder="Select date & time"
                                className="w-full"
                                style={{ height: "48px" }}
                                suffixIcon={<FiEdit3 size={20} color="#286a25" />}
                            />
                        </Form.Item>

                        <div className="flex items-center gap-2 mt-2">
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
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <Image
                                                src={service.image}
                                                alt={`${service.title} car`}
                                                width={500}
                                                height={200}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>

                                        <h2 className="text-xl font-medium text-[#000000] mb-1">{service.title}</h2>
                                        <p className="text-content2 mb-2 text-[18px]">{service.description}</p>

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
                                                onClick={() => formValid && handleSelect(service.id)}
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
                </Form>
            </div>

            <div className="w-1/4">
                <PriceDetails />
            </div>
        </div>
    );
};

export default RideOption;
