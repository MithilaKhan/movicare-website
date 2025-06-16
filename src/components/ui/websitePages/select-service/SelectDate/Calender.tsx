"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Calender = ({ unavailableDay, selectedDate, setSelectedDate }: { unavailableDay: string[] | undefined, selectedDate: string | null, setSelectedDate: React.Dispatch<React.SetStateAction<string | null>> }) => {

  const [value, setValue] = useState<Dayjs>(dayjs());

  const disabledDate = (date: Dayjs): boolean => {
    return unavailableDay?.some((d: string) => dayjs(date).isSame(dayjs(d), "day")) ?? false;
  };

  const toggleDate = (date: Dayjs) => {
    const formatted = date.format("YYYY-MM-DD");
    if (disabledDate(date)) return; // skip if date is disabled
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

  const baseStyle =
    "w-full h-full flex items-center justify-center transition-all";
  const innerStyle =
    "w-10 h-10 flex items-center justify-center rounded-full";

  return (
    <div>
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
          const selectedStyle = isSelected ? "bg-primary text-white rounded-full " : "";
          const disabledStyle = isDisabled
            ? "cursor-not-allowed text-gray-400  rounded-full "
            : "cursor-pointer";

          const handleClick = () => {
            if (!isDisabled) {
              toggleDate(date);
            }
          };

          return (
            <div
              className={`${baseStyle} ${disabledStyle}`}
              onClick={handleClick}
            >
              <div className={`${innerStyle} ${selectedStyle}`}>
                <span className="text-sm font-medium">{date.date()}</span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calender;
