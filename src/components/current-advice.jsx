export default function CurrentAdvice() {
  return (
    <>
      <section className="w-screen md:w-[90vw] flex flex-col md:flex md:flex-row justify-center items-center md:items-center ">
        <img
          className="w-[40rem]"
          src="./images/asian-woman-man-with-winter.png"
          alt=""
        />

        <div className="hidden md:flex order-[-1]  w-[15rem] md:w-[33rem] md:order-[1] justify-center items-center md:items-start flex-col md:flex md:flex-col gap-[2.8rem] p-[1rem] md:pt-[5rem]">
          <h2 className="text-[#BDBDBD] font-bold text-xl">SUMMER 2020</h2>
          <h2 className="font-bold text-3xl  md:w-[27rem] md:text-start">
            Part of the Neural Universe
          </h2>
          <p className="text-[#737373] text-xl    w-[15rem] md:w-[29rem]">
            We know how large objects will act, but things on a small scale
          </p>

          <div className="flex flex-col md:flex md:flex-row gap-[1.5rem]">
            <button className="btnBuyGreen text-md">BUY NOW</button>
            <button className="btnTransparent solid border-[2px] border-[#2DC071]">
              READ MORE
            </button>
          </div>
        </div>

        <div className="flex md:hidden order-[-1] mt-[5rem]  w-[15rem] md:w-[33rem] md:order-[1] justify-center items-center md:items-start flex-col md:flex md:flex-col gap-[2.8rem] p-[1rem] md:pt-[5rem]">
          <h2 className="text-[#BDBDBD] font-bold text-xl">SUMMER 2020</h2>
          <h2 className="font-bold text-3xl text-center  md:w-[27rem] ">
            Part of the Neural Universe
          </h2>
          <p className="text-[#737373] text-xl text-center    w-[15rem] md:w-[29rem]">
            We know how large objects will act, but things on a small scale
          </p>

          <div className="flex flex-col md:flex md:flex-row gap-[1.5rem]">
            <button className="btnBuyGreen text-md">BUY NOW</button>

            <button className="btnTransparent text-[#23A6F0] solid border-[2px] border-[#23A6F0]">
              READ MORE
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
