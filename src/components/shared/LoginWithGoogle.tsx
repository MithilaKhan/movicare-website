
const LoginWithGoogle = () => {

    return (
        <div
             onClick={() => {
                window.location.href = "http://31.97.171.35:5001/api/v1/auth/google";
            }} 
   
            className=" flex items-center cursor-pointer gap-1 px-4 py-1 bg-[#f5f5f5] border border-dashed border-[#D9D9D9] rounded-lg mb-4 h-[50px]">
            <div className=" flex items-center justify-center gap-3 w-full ">
                <img src="/google.png" alt="" className="w-[24px] h-[24px] object-contain" />
                <p className="text-[#636363] text-[16px] ">Continue with Google</p>
            </div>
        </div>
    );
};

export default LoginWithGoogle;