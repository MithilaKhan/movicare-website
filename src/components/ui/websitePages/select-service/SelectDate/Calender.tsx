"use client";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, ConfigProvider } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import locale files for Day.js and Ant Design
import "dayjs/locale/es";
import "dayjs/locale/en";
import esES from "antd/locale/es_ES";
import enUS from "antd/locale/en_US";

const Calender = ({
  unavailableDay,
  selectedDate,
  setSelectedDate,
  selectedLanguage,
}: {
  unavailableDay: string[] | undefined;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLanguage: string | undefined;
}) => {
  // Set default locale to English if selectedLanguage is not provided
  const locale = selectedLanguage === "es" ? "es" : "en";
  const antdLocale = selectedLanguage === "es" ? esES : enUS;

  // Set Day.js locale
  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]); // Re-run when selectedLanguage changes

  const [value, setValue] = useState<Dayjs>(dayjs());

  const disabledDate = (date: Dayjs): boolean => {
    const isPastDate = date.isBefore(dayjs(), 'day');
    const isUnavailable =
      unavailableDay?.some((d: string) => dayjs(date).isSame(dayjs(d), 'day')) ?? false;
    return isPastDate || isUnavailable;
  };

  const toggleDate = (date: Dayjs) => {
    const formatted = date.format("YYYY-MM-DD");
    if (disabledDate(date)) return;
    setSelectedDate((prev) => (prev === formatted ? null : formatted));
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newValue = direction === "prev" ? value.subtract(1, "month") : value.add(1, "month");
    setValue(newValue);
  };

  const changeYear = (direction: "prev" | "next") => {
    const newValue = direction === "prev" ? value.subtract(1, "year") : value.add(1, "year");
    setValue(newValue);
  };

  const baseStyle = "w-full h-full flex items-center justify-center transition-all";
  const innerStyle = "w-10 h-10 flex items-center justify-center rounded-full";

  return (
    <div>
      <ConfigProvider locale={antdLocale}>
        <Calendar
          value={value}
          onPanelChange={setValue}
          fullscreen={false}
          disabledDate={disabledDate}
          headerRender={() => {
            return (
              <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center space-x-4">
                  <LeftOutlined className="cursor-pointer" onClick={() => changeMonth("prev")} />
                  <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                    {dayjs(value).format("MMMM")}
                  </p>
                  <RightOutlined className="cursor-pointer" onClick={() => changeMonth("next")} />
                </div>
                <div className="flex items-center space-x-4">
                  <LeftOutlined className="cursor-pointer" onClick={() => changeYear("prev")} />
                  <p className="text-[#333333] text-[16px] leading-6 font-semibold">
                    {dayjs(value).format("YYYY")}
                  </p>
                  <RightOutlined className="cursor-pointer" onClick={() => changeYear("next")} />
                </div>
              </div>
            );
          }}
          fullCellRender={(date) => {
            const formatted = date.format("YYYY-MM-DD");
            const isSelected = selectedDate === formatted;
            const isDisabled = disabledDate(date);
            const isToday = dayjs().isSame(date, "day");

            const selectedStyle = isSelected ? "bg-primary text-white rounded-full " : isDisabled ? " cursor-not-allowed text-gray-400 bg-gray-100 opacity-50 " : isToday? "text-yellow-600 bg-gray-100 rounded-full": "";


            const handleClick = () => {
              if (!isDisabled) {
                toggleDate(date);
              }
            };

            return (
              <div
                className={`${baseStyle} `}
                onClick={handleClick}
              >
                <div className={`${innerStyle} ${selectedStyle}`}>
                  <span className="text-sm font-medium">{date.date()}</span>
                </div>
              </div>
            );
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Calender;