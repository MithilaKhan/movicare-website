"use client";

import { ConfigProvider, DatePicker, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsCalendar4 } from 'react-icons/bs';
import { GrLocationPin } from 'react-icons/gr';
import { PiArrowBendUpRightBold } from 'react-icons/pi';
import { SiRelay } from 'react-icons/si';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { userContext } from '@/helpers/UserProvider';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/en'; // English locale for dayjs
import 'dayjs/locale/es'; // Spanish locale for dayjs
import enUS from 'antd/es/locale/en_US'; // English locale for Ant Design
import esES from 'antd/es/locale/es_ES';
import Cookies from "js-cookie";
// import Cookies from "js-cookie";

dayjs.extend(updateLocale);

const Banner = () => {
  const router = useRouter();
  const [pickUp, setPickUp] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>()
  const userContextValue = useContext(userContext);
  const user = userContextValue?.user;
  const GOOGLE_MAP_LIBRARIES: ("drawing" | "geometry" | "places" | "visualization")[] = ["places"];
  const selectedLanguage = Cookies.get("currentLanguage")

  // Set dayjs locale based on language
  useEffect(() => {
    dayjs.locale(selectedLanguage);
    // console.log('Current locale:', dayjs.locale());
    // console.log('Today:', dayjs().format('dddd, MMMM D, YYYY'));
  }, [selectedLanguage]);

  // console.log(selectedDate);

  const formatDate = (date: unknown) => {
    if (!date || !dayjs.isDayjs(date)) {
      return '';
    }
    return dayjs(date).format('YYYY-MM-DD');
  };

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const pickUpRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropOffRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handle place selection for pickup
  const handlePickUpPlaceChanged = () => {
    if (pickUpRef.current) {
      const place = pickUpRef.current.getPlace();
      if (place.formatted_address) {
        setPickUp(place.formatted_address);
      }
    }
  };

  // Handle place selection for dropoff
  const handleDropOffPlaceChanged = () => {
    if (dropOffRef.current) {
      const place = dropOffRef.current.getPlace();
      if (place.formatted_address) {
        setDropOff(place.formatted_address);
      }
    }
  };

  // Autocomplete options restricted to Costa Rica cities
  const autocompleteOptions = {
    componentRestrictions: { country: 'cr' },
    types: ['geocode'],
    fields: ['formatted_address', 'geometry', 'name'],
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const disabledDate = (date: Dayjs): boolean => {
    const isPastDate = date.isBefore(dayjs(), 'day');
    return isPastDate ;
  };

  const handleCheckAvailability = () => {

    const queryParams = new URLSearchParams({
      step: '1',
      pickup: pickUp || '',
      dropOff: dropOff || '',
      date: selectedDate ? formatDate(selectedDate) : ""
    });
    router.push(`/select-service?${queryParams.toString()}`);
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url('/home.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
      }}
    >
      <div className="flex flex-col items-center lg:justify-start justify-center h-full lg:pt-[200px] pt-4">
        {/* Title */}
        <div className="lg:text-[56px] text-[31px] text-white lg:text-start text-center">
          <p>
            <span className="font-bold">Accessible </span> Transportation,
          </p>
          <div className="flex items-center lg:justify-start justify-center gap-2 font-bold">
            <span>Redefined in</span>
            <img
              src="/FlagIcon.png"
              alt=""
              className="w-[49px] h-[49px] mx-3 lg:block hidden"
            />
            <span>Costa Rica</span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="lg:text-[18px] text-[16px] text-[#d1d6d4] px-2 lg:px-0 lg:w-1/3 w-full text-center mt-4 tracking-wide">
          Safe, comfortable, and hassle-free mobility for wheelchair users and
          individuals with reduced mobility.
        </p>

        {/* Form Section */}
        <div className="flex items-center justify-center lg:w-2/3 w-full lg:px-0 px-3 mt-10">
          {user ? (
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 w-full">

              <div className="lg:col-span-3 col-span-1">
                <div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4 w-full">
                  {/* Pickup */}
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#53645f',
                        colorTextBase: '#ffffff',
                        colorTextPlaceholder: '#a8b2af',
                        colorBgContainer: '#666d66',
                        colorBgElevated: '#666d66',
                        colorIcon: '#ffffff',
                      },
                    }}
                  >
                    <Autocomplete
                      onLoad={(autocomplete) => (pickUpRef.current = autocomplete)}
                      onPlaceChanged={handlePickUpPlaceChanged}
                      options={autocompleteOptions}
                    >
                      <Input
                        placeholder="Enter pickup location"
                        style={{ width: '100%', height: '48px' }}
                        prefix={<SiRelay size={20} color="#ffffff" className="mx-2" />}
                        value={pickUp}
                        onChange={(e) => setPickUp(e.target.value)}
                      />
                    </Autocomplete>
                  </ConfigProvider>

                  {/* Dropoff */}
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#53645f',
                        colorTextBase: '#ffffff',
                        colorTextPlaceholder: '#a8b2af',
                        colorBgContainer: '#666d66',
                        colorBgElevated: '#666d66',
                        colorIcon: '#ffffff',
                      },
                    }}
                  >
                    <Autocomplete
                      onLoad={(autocomplete) => (dropOffRef.current = autocomplete)}
                      onPlaceChanged={handleDropOffPlaceChanged}
                      options={autocompleteOptions}
                    >
                      <Input
                        placeholder="Enter destination address"
                        style={{ width: '100%', height: '48px' }}
                        prefix={<GrLocationPin size={20} color="#ffffff" className="mx-2" />}
                        value={dropOff}
                        onChange={(e) => setDropOff(e.target.value)}
                      />
                    </Autocomplete>
                  </ConfigProvider>

                  {/* Date Picker */}
                  <div translate='no' >
                    <ConfigProvider
                      locale={selectedLanguage === 'en' ? enUS : esES}
                      theme={{
                        token: {
                          colorPrimary: '#53645f',
                          colorTextBase: '#ffffff',
                          colorTextPlaceholder: '#a8b2af',
                          colorBgContainer: '#666d66',
                          colorBgElevated: '#666d66',
                          colorIcon: '#ffffff',
                        },
                      }}
                    >

                      <DatePicker
                        placeholder="Select date & time"
                        style={{ width: '100%', height: '48px' }}
                        prefix={<BsCalendar4 size={18} color="#ffffff" className="mx-2" />}
                        suffixIcon={''}
                        showToday={false}
                        onChange={(value) => setSelectedDate(value)}
                        disabledDate={(current) => disabledDate(current)}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="lg:col-span-1 col-span-1">
                <button
                  className="text-[16px] w-full text-[#286A25] bg-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2"
                  onClick={handleCheckAvailability}
                >
                  <span>Check Availability</span>
                  <PiArrowBendUpRightBold size={16} color="#286A25" />
                </button>
              </div>
            </div>
          ) : (
            // For non-logged-in users
            <div className="w-full flex justify-center">
              <div className="lg:w-[45%] w-full">
                <button
                  className="text-[16px] w-full text-[#286A25] bg-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2"
                  onClick={handleCheckAvailability}
                >
                  <span>Check Availability</span>
                  <PiArrowBendUpRightBold size={16} color="#286A25" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;