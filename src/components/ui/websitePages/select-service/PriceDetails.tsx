
const PriceDetails = () => {
    return (
        
      <div className=" bg-[#f0f3f1] border border-[#e0dfdf] p-8 rounded-lg h-[295px]">
        <p className="text-xl font-[#070707] font-medium">Price Details</p>
        <div className="flex flex-col gap-y-5 mt-4">
          {["Service", "Base Fare", "Additional Travelers", "Taxes & Fees"].map((label) => (
            <div
              key={label}
              className={`flex justify-between items-center ${
                label === "Taxes & Fees" ? "border-b border-dashed border-[#d8dbd9] pb-5" : ""
              }`}
            >
              <p className="text-content2 text-sm">{label}</p>
              <p className="text-content3 text-sm">-</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3">
          <p className="text-content2 text-lg">Total</p>
          <p className="text-content3 text-sm">-</p>
        </div>
      </div>
    );
};

export default PriceDetails;