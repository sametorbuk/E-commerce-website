import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import InnerPagesHeader from "../layouts/inner-pages-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { membersData } from "./TeamPage";
import TeamMember from "../components/team-member";
import {
  faAws,
  faHooli,
  faLyft,
  faPiedPiperHat,
  faRedditAlien,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../layouts/footer";

const staticsData = [
  {
    count: "15K",
    which: "Happy customers",
  },
  {
    count: "150K",
    which: "Monthly Visitors",
  },
  {
    count: "15",
    which: "Countries Worldwide",
  },
  {
    count: "100+",
    which: "Top Partners",
  },
];

export default function AboutUsPage() {
  const divStyle = {
    width: "80%",
    height: "80vh",
    backgroundImage: "url(./images/about-us-page/about-us-view.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div className="md:hidden">
        <Header />
      </div>
      <InnerPagesHeader />
      <main className=" flex-col  md:flex md:flex-col items-center justify-center  md:px-[8rem] gap-[2rem]">
        <div className="flex flex-col md:flex-row items-center ">
          <div className="flex flex-col md:py-[5rem] 2xl:p-[8rem] font-bold gap-[3rem] mt-[6rem] md:mt-[0rem]  items-center md:items-start ">
            <h3 className="text-xl hidden md:block  ">About Company</h3>

            <h2 className=" block md:hidden text-5xl text-center ">ABOUT US</h2>

            <h2 className=" hidden md:block text-5xl  ">ABOUT US</h2>

            <p className=" block md:hidden text-[#737373] w-[15rem] text-center ">
              We know how large objects will act, but things on a small scale
            </p>

            <p className="hidden md:block text-[#737373] w-[21rem]  ">
              We know how large objects will act, but things on a small scale
            </p>

            <button className="btnBlueWithWhiteText w-[13rem] h-[3rem] rounded-md">
              Get Quote now
            </button>
          </div>

          <img
            className=" w-[50rem] h-[20rem] md:w-[55rem] md:h-[30rem]"
            src="./images/about-us-page/about-us-hero.png"
            alt=""
          />
        </div>

        <div className="flex flex-col md:flex-row gap-[5rem] mt-[3rem] items-center">
          <div className="flex flex-col gap-[2rem] font-bold items-center md:items-start">
            <p className=" text-[#E74040]">Problems Trying</p>
            <p className=" md:hidden text-xl text-center w-[19rem] ">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </p>
            <p className="hidden md:block text-xl  ">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </p>
          </div>

          <div className="flex flex-col text-[#737373] font-bold">
            <p className="hidden md:block">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </p>
            <p className="md:hidden text-center w-[20rem]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center justify-around w-full my-[5rem] gap-[3rem]  font-bold">
          {staticsData.map((item, ind) => {
            return (
              <>
                <div
                  key={ind}
                  className="flex flex-col gap-[1rem] items-center"
                >
                  <p className="text-5xl">{item.count}</p>
                  <p className="text-[#737373] ">{item.which}</p>
                </div>
              </>
            );
          })}
        </div>

        <div
          className="hidden md:flex justify-center items-center h-[10rem] mb-[4rem] rounded-3xl"
          style={divStyle}
        >
          <button className="btnBlueWithWhiteText absolute rounded-full items-center  w-[4.5rem] h-[4.5rem] text-3xl">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>

        <div className="md:hidden flex justify-center items-center w-screen">
          <img
            className="block md:hidden w-[19rem] rounded-3xl"
            src="./images/about-us-page/about-us-view.png"
            alt=""
          />
          <button className="btnBlueWithWhiteText absolute rounded-full items-center w-[3rem] h-[3rem] text-xl">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>

        <div className="flex flex-col w-full font-bold items-center my-[5rem] gap-[6rem]">
          <div className="flex flex-col items-center gap-[2rem]">
            <h2 className="text-4xl">Meet Our Team</h2>
            <p className="w-[23rem]  md:w-[35rem] text-center text-[#737373]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </p>
          </div>

          <div className="flex gap-[2rem] flex-col md:flex-row justify-around w-full">
            {membersData.slice(0, 3).map((member, ind) => {
              return <TeamMember key={ind} member={member} />;
            })}
          </div>
        </div>

        <div className="flex flex-col items-center font-bold">
          <div className=" w-[6rem]  text-center md:w-[35rem] flex flex-col  font-bold items-center gap-[2rem]">
            <h2 className="text-4xl">Big Companies Are Here</h2>

            <p className="w-[19rem] text-[#737373] md:w-[40rem] text-center">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center   text-7xl mt-[3rem]  gap-[2rem] md:gap-[3.5rem] mt-[4rem]  text-gray-500">
            <FontAwesomeIcon icon={faHooli} />

            <FontAwesomeIcon icon={faLyft} />
            <FontAwesomeIcon icon={faPiedPiperHat} />
            <FontAwesomeIcon icon={faStripe} />
            <FontAwesomeIcon icon={faAws} />
            <FontAwesomeIcon icon={faRedditAlien} />
          </div>
        </div>

        <div className="flex w-screen mb-[3rem] mt-[5rem]">
          <div className="flex flex-col  text-white font-bold justify-center  items-center md:items-start gap-[2rem] md:gap-[2.7rem] w-screen px-[4rem]  h-[27rem] md:w-[55%] md:h-[36rem] bg-sky-700 md:p-[7rem] ">
            <h3>WORK WITH US</h3>

            <div className="hidden md:flex md:flex-col gap-[2rem] ">
              <h2 className="text-4xl">Now Let’s grow Yours</h2>
              <p>
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th{" "}
              </p>
            </div>

            <div className=" flex flex-col md:hidden text-center gap-[2rem]">
              <h2 className="text-4xl">Now Let’s grow Yours</h2>
              <p>
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th{" "}
              </p>
            </div>

            <button className="border border-1 border-white w-[10rem] h-[2.5rem] rounded-lg">
              Button
            </button>
          </div>
          <img
            className="hidden md:block md:w-[45%] h-[36rem]"
            src="./images/about-us-page/about-us-work-with-us-area.png"
            alt=""
          />
        </div>

        <Footer />
      </main>
    </>
  );
}
