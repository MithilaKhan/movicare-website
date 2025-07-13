"use client";
import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SelectLocation = ({
  next,
  prev,
  updateFormData,
  formData
}: {
  next: () => void;
  prev: () => void;
  updateFormData: (newData: Partial<BookingDetails>) => void;
  formData: BookingDetails
}) => {
  const [form] = Form.useForm();
  const [isSelected, setIsSelected] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup');
  const dropOff = searchParams.get('dropOff');
  const [viewport, setViewport] = useState({
    latitude: 9.9281,
    longitude: -84.0907,
    zoom: 8,
  });

  const [pickUpMarker, setPickUpMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [dropOffMarker, setDropOffMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const GOOGLE_MAP_LIBRARIES: ("drawing" | "geometry" | "places" | "visualization")[] = ["places"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    setIsSelected(!!values.pickUpCity && !!values.dropOffCity);
  };

  useEffect(() => {

    if (formData?.pickup_location || formData?.dropoff_location) {

      form.setFieldsValue({ pickUpCity: formData.pickup_location, dropOffCity: formData.dropoff_location });

      const values = form.getFieldsValue();
      setIsSelected(!!values.pickUpCity && !!values.dropOffCity);

    }

  }, [form, formData]);

  useEffect(() => {
    if (pickup || dropOff) {
      form.setFieldsValue({ pickUpCity: pickup, dropOffCity: dropOff });
      const values = form.getFieldsValue();
      setIsSelected(!!values.pickUpCity && !!values.dropOffCity);
    }
  }, [form, pickup, dropOff]);

  const onFinish = async (values: { pickUpCity: string; dropOffCity: string }) => {
    const geocodeAddress = (address: string): Promise<google.maps.LatLngLiteral> => {
      return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else {
            reject(`Geocode failed for ${address}: ${status}`);
          }
        });
      });
    };

    const getDistanceDuration = (
      origin: google.maps.LatLngLiteral,
      destination: google.maps.LatLngLiteral
    ): Promise<{ distance: number; duration: number }> => {
      return new Promise((resolve, reject) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (
              status === "OK" &&
              response?.rows[0].elements[0].status === "OK"
            ) {
              const element = response?.rows[0].elements[0];
              const distanceInKm = element.distance.value / 1000;
              const durationInHours = element.duration.value / 3600
              resolve({
                distance: parseFloat(distanceInKm.toFixed(2)),
                duration: parseFloat(durationInHours.toFixed(2)),
              });
            } else {
              reject("Distance Matrix failed: " + status);
            }
          }
        );
      });
    };

    try {
      const [pickupCoords, dropoffCoords] = await Promise.all([
        geocodeAddress(values.pickUpCity),
        geocodeAddress(values.dropOffCity),
      ]);

      setPickUpMarker(pickupCoords);
      setDropOffMarker(dropoffCoords);
      map?.panTo(pickupCoords);

      const { distance, duration } = await getDistanceDuration(pickupCoords, dropoffCoords);

      updateFormData({
        pickup_location: values.pickUpCity,
        dropoff_location: values.dropOffCity,
        distance,
        duration,
      });

      next();
    } catch (error) {
      console.error("Error calculating distance:", error);
      alert("Only locations inside Costa Rica are allowed.");
    }
  };

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

const geocodeCity = (city: string, type: "pickup" | "dropoff") => {
  if (!window.google || !city?.trim()) {
    toast.error("Please enter a city name.");
    return;
  }

  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: city.trim() }, (results, status) => {
    if (status === "OK" && results && results[0]) {
      const result = results[0];

      const isInCostaRica = result.address_components.some((component) =>
        component.long_name === "Costa Rica" || component.short_name === "CR"
      );

      if (!isInCostaRica) {
        toast.error("Only locations inside Costa Rica are allowed.");
        return;
      }

      const location = result.geometry.location;
      const latLng = { lat: location.lat(), lng: location.lng() };

      setViewport((prev) => ({
        ...prev,
        latitude: latLng.lat,
        longitude: latLng.lng,
      }));

      if (type === "pickup") {
        setPickUpMarker(latLng);
      } else {
        setDropOffMarker(latLng);
      }

      map?.panTo(latLng);
    } else {
      toast.error("Location not found. Please enter a valid city in Costa Rica.");
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
              className={`${isSelected ? "bg-primary" : "bg-[#b5b5b5] cursor-not-allowed"
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
