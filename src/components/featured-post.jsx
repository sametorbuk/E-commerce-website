import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeaturedPost(props) {
  const { item } = props;
  const { desktop, mobile } = item;
  return (
    <>
      <div className="flex flex-col items-center md:flex md:flex-col md:w-[20rem] gap-[1rem]">
        <img
          className="hidden md:block w-[20rem] h-[16rem]   md:w-[25rem] md:h-[16rem]"
          src={desktop}
          alt=""
        />

        <img
          className="block md:hidden w-[20rem] h-[16rem]   md:w-[25rem] md:h-[16rem]"
          src={mobile}
          alt=""
        />

        <button className="bg-red-500 absolute mt-[1rem] mr-[14rem] md:absolute md:mr-[14rem] md:mt-[1rem] text-white font-bold rounded-[3px] py-[0.1rem]  w-[3.5rem]">
          NEW
        </button>

        <div className="flex flex-col p-[1rem] gap-[1.8rem]">
          <div className="flex gap-[1rem]">
            <button className="text-[#8EC2F2]">Google</button>
            <button className="text-[#737373]">Trending</button>
            <button className="text-[#737373]">New</button>
          </div>

          <p className="font-bold text-xl">
            Loudest à la Madison #1 (L`integral)
          </p>

          <p className="text-[#737373]">
            We focus on ergonomics and meeting you where you work. It`s only a
            keystroke away.
          </p>

          <div className="w-[100%] flex justify-between gap-[1rem] ">
            <div className="flex items-center gap-[0.4rem]">
              <FontAwesomeIcon icon={faClock} style={{ color: "#80aeff" }} />
              <p className="text-[#737373] font-bold">22 April 2021</p>
            </div>

            <div className="flex gap-[0.4rem] items-center">
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ color: "#00570a" }}
              />
              <p className="text-[#737373] font-bold">10 Comments</p>
            </div>
          </div>

          <div className="flex md:flex items-center gap-[0.4rem]">
            <p className="text-gray-500 font-bold">Learn More</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#85b1ff" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
