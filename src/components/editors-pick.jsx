export default function EditorsPick() {
  return (
    <>
      <div className="flex w-screen gap-[1.3rem]  md:w-[100%]  mt-[4rem] md:gap-[1.3rem] md:mt-[5rem] flex-col items-center md:w-screen md:flex md:flex-col md:items-center">
        <h2 className="font-bold mt:font-bold text-xl md:text-3xl">
          EDITOR'S PICK
        </h2>
        <p className="font-bold text-[#737373]">
          Problems trying to resolve the conflict between
        </p>

        <div className="flex md:gap-[0rem] flex-col md:justify-between md:flex md:ml-[7rem]  md:flex-row md:h-[20rem] md:w-[60rem] ">
          <img
            className="md:grow-[0.5]  md:w-[15rem]"
            src="./images/editors-pick/editors-pick-img-1.jpg"
            alt=""
          />

          <button className="btn ml-[1rem] bg-white  bottom-[5rem] w-[10rem] md:h-[3rem] md:top-[80rem] md:ml-[1.5rem] md:px-[3rem]">
            MEN
          </button>

          <div className="md:flex gap-[1.3rem] ">
            <img
              className=""
              src="./images/editors-pick/editors-pick-img-2.jpg"
              alt=""
            />

            <button className="btn  ml-[1rem] bottom-[5rem] bg-white    md:top-[80rem] md:h-[3rem]   md:ml-[1.5rem] md:px-[3rem]">
              WOMEN
            </button>

            <div className="md:flex md:flex-col md:justify-between md:gap-[1.3rem] ">
              <img
                className="md:grow-[0.5] md:h-[9rem] md:w-[9rem] "
                src="./images/editors-pick/editors-pick-img-3.jpg"
                alt=""
              />

              <button className="btn  bg-white ml-[1rem] bottom-[5rem] md:h-[2.5rem] md:top-[71rem] md:ml-[0.6rem] md:py-[0.4rem] md:px-[0.5rem]">
                ACCESORRIES
              </button>

              <img
                className="md:grow-[0.5] md:h-[9rem] md9w-[9rem] "
                src="./images/editors-pick/editors-pick-img-4.jpg"
                alt=""
              />

              <button className="btn bg-white  ml-[1rem]  bottom-[5rem] md:h-[2.5rem] md:top-[81.5rem] md:ml-[1rem] md:py-[0.4rem] md:px-[1.5rem]">
                KIDS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
