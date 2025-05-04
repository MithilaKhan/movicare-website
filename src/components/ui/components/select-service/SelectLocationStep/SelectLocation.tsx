"use client";
import React, { useState } from "react";
import PriceDetails from "../PriceDetails";
import { Form, Input } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const SelectLocation = ({ next, prev }: { next: () => void; prev: () => void }) => {
  const [form] = Form.useForm();
  const [isSelected, setIsSelected] = useState(false);

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    setIsSelected(!!values.pickUpCity && !!values.dropOffCity);
  };

  const onFinish = () => {
    next();
  };

  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    zoom: 10,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "" , 
  });

  const [map, setMap] = useState<google.maps.Map | null>(null); 
  console.log(map);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  return (
    <div className="flex w-full gap-4 mt-[56px]">
      <div className="bg-white border border-[#e0dfdf] p-8 rounded-lg w-3/4">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          className="w-full h-auto"
        >
          <div className="flex items-center gap-1 pb-6">
            <span onClick={() => prev()}>
              <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
            </span>
            <span className="text-xl text-[#070707] font-medium">
              Select Pickup & Drop-off Location
            </span>
          </div>

          <Form.Item
            name="pickUpCity"
            label={<p className="text-content2 text-sm">Pick up city</p>}
            className="mt-4"
            rules={[{ required: true, message: "Please select pick up city" }]}
          >
            <Input
              placeholder="Pick Up City"
              style={{ height: 48 }}
              suffix={<MdOutlineMyLocation size={20} color="#286a25" onClick={handleGetLocation} className="cursor-pointer" />}
            />
          </Form.Item>

          <Form.Item
            name="dropOffCity"
            label={<p className="text-content2 text-sm">Drop-off city</p>}
            className="mt-4"
            rules={[{ required: true, message: "Please select drop-off city" }]}
          >
            <Input
              placeholder="Drop-off city"
              style={{ height: 48 }}
              suffix={<MdOutlineMyLocation size={20} color="#286a25" />}
            />
          </Form.Item>

          <Form.Item className="mt-8 w-full">
            <button
              type="submit"
              className={`${
                isSelected ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
              } text-white py-3 px-6 rounded-full text-[16px] transition-colors duration-300 w-full`}
              disabled={!isSelected}
            >
              Choose Date & Service
            </button>
          </Form.Item>
        </Form>

        {/* Map Display */}
        {isLoaded && (
          <div className="mt-6" style={{ height: "350px", borderRadius: "10px", overflow: "hidden" }}>
            <GoogleMap
              center={{ lat: viewport.latitude, lng: viewport.longitude }}
              zoom={viewport.zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker
                position={{ lat: viewport.latitude, lng: viewport.longitude }}
                icon={{
                  url: "/marker.png", // make sure this exists in your public folder
                  scaledSize: new google.maps.Size(25, 30),
                }}
              />
            </GoogleMap>
          </div>
        )}
      </div>

      {/* Price Details Panel */}
      <div className="w-1/4">
        <PriceDetails />
      </div>
    </div>
  );
};

export default SelectLocation;
