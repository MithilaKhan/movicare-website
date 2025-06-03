"use client";
import React, { useState } from "react";
import PriceDetails from "../PriceDetails";
import { Form, Input } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { BookingDetails } from "../SelectServiceMainPage";

const SelectLocation = ({ next,prev,updateFormData }: { next: () => void; prev: () => void ; updateFormData: (newData: Partial<BookingDetails>) => void}) => {
  const [form] = Form.useForm();
  const [isSelected, setIsSelected] = useState(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const [pickUpMarker, setPickUpMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [dropOffMarker, setDropOffMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    setIsSelected(!!values.pickUpCity && !!values.dropOffCity);
  };

  const onFinish = (values: { pickUpCity: string; dropOffCity: string }) => { 
    updateFormData({
      pickup_location: values.pickUpCity,
      dropoff_location: values.dropOffCity,
    });
    next();
  };

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const geocodeCity = (city: string, type: "pickup" | "dropoff") => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: city }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const latLng = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setViewport({ ...viewport, latitude: latLng.lat, longitude: latLng.lng });

        if (type === "pickup") {
          setPickUpMarker(latLng);
        } else {
          setDropOffMarker(latLng);
        }

        map?.panTo(latLng);
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full gap-4 mt-[56px]">
      <div className="bg-white border border-[#e0dfdf] p-8 rounded-lg lg:w-3/4 w-full">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <div className="flex items-center gap-1 pb-6">
            <span onClick={() => prev()}>
              <IoIosArrowBack size={20} color="#286a25" className="pt-1 cursor-pointer" />
            </span>
            <span className="lg:text-xl text-[16px] text-[#070707] font-medium">
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
              suffix={
                <MdOutlineMyLocation
                  size={20}
                  color="#286a25"
                  onClick={() => geocodeCity(form.getFieldValue("pickUpCity"), "pickup")}
                  className="cursor-pointer"
                />
              }
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
              suffix={
                <MdOutlineMyLocation
                  size={20}
                  color="#286a25"
                  onClick={() => geocodeCity(form.getFieldValue("dropOffCity"), "dropoff")}
                  className="cursor-pointer"
                />
              }
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

        {isLoaded && (
          <div className="mt-6" style={{ height: "350px", borderRadius: "10px", overflow: "hidden" }}>
            <GoogleMap
              center={{ lat: viewport.latitude, lng: viewport.longitude }}
              zoom={viewport.zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {pickUpMarker && (
                <Marker
                  position={pickUpMarker}
                  icon={{
                    url: "/img1.png",
                    scaledSize: new google.maps.Size(25, 20),
                  }}
                />
              )}
              {dropOffMarker && (
                <Marker
                  position={dropOffMarker}
                  icon={{
                    url: "/img2.png",
                    scaledSize: new google.maps.Size(25, 20),
                  }}
                />
              )}
            </GoogleMap>
          </div>
        )}
      </div>

      <div className="lg:w-1/4 w-full">
        <PriceDetails />
      </div>
    </div>
  );
};

export default SelectLocation;
