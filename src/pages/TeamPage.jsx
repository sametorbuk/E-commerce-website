import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InnerPagesHeader from "../layouts/inner-pages-header";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TeamMember from "../components/team-member";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

export const membersData = [
  {
    name: "Gökhan Özdemir",
    profession: "Scrum Master",
    src: "./images/team-page/team-members/team-gokhanozdemir.jpg",
  },
  {
    name: "Erhan Fırat",
    profession: "Project Owner",
    src: "./images/team-page/team-members/team-erhan-fırat.jpg",
  },
  {
    name: "Pelin Karakoca",
    profession: "Full stack developer",
    src: "./images/team-page/team-members/team-pelin-karakoca.jpg",
  },

  {
    name: "Doğukan Kurban",
    profession: "Full stack developer",
    src: "./images/team-page/team-members/team-dogukankurban.jpg",
  },
  {
    name: "Samet Orbuk",
    profession: "Full stack developer",
    src: "./images/team-page/team-members/team-member-sametorbuk.jpeg",
  },
  {
    name: "Ceren Güney",
    profession: "Full stack developer",
    src: "./images/team-page/team-members/team-member-cerengüney.jpg",
  },
];

const membersFirstThree = membersData.slice(0, 3);
const membersSecondThree = membersData.slice(3, 6);

export default function TeamPage() {
  return (
    <>
      <InnerPagesHeader />

      <div className="md:hidden mb-[6rem]">
        {" "}
        <Header />{" "}
      </div>
      <main className=" flex-col  md:flex md:flex-col items-center justify-center  md:px-[5rem] gap-[2rem]">
        <div className="flex flex-col  m-[5rem] items-center gap-[2.5rem]">
          <h3 className="text-[#737373] font-bold text-xl">WHAT WE DO</h3>
          <h1 className="font-bold text-5xl text-center">
            Innovation tailored for you
          </h1>

          <div className="flex items-center font-bold gap-[1rem] text-lg">
            <p>Home</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#9e9e9e" }}
            />
            <p className="text-[#9e9e9e]">Team</p>
          </div>
        </div>

        <div className="hidden md:flex  md:flex-row items-center md:items-start w-screen gap-[1rem]">
          <img
            className="w-[50%] h-[50%]"
            src="./images/team-page/team-page-hero1.jpg"
            alt=""
          />

          <div className="flex flex-col w-[50%] h-[50%] gap-[1rem]">
            <div className="flex w-full h-[19.95rem] gap-[1rem] ">
              <img
                className="w-[52%] h-[100%]"
                src="./images/team-page/team-page-hero2.jpg"
                alt=""
              />
              <img
                className="w-[47.5%] h-[100%]"
                src="./images/team-page/team-page-hero3.jpg"
                alt=""
              />
            </div>
            <div className="flex  w-full h-[19.95rem]  gap-[1rem] ">
              <img
                className="w-[50%] h-[100%]"
                src="./images/team-page/team-page-hero4.jpg"
                alt=""
              />
              <img
                className="w-[50%] h-[100%]"
                src="./images/team-page/team-page-hero5.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:hidden gap-[0.6rem]">
          <img src="./images/team-page/team-page-hero1.jpg" alt="" />

          <div className="flex flex-col gap-[0.6rem]">
            <div className="flex gap-[0.6rem]">
              <img
                className="w-[12.3rem] h-[12.3rem]"
                src="./images/team-page/team-page-hero2.jpg"
                alt=""
              />
              <img
                className="w-[11.5rem]  h-[12.3rem]"
                src="./images/team-page/team-page-hero3.jpg"
                alt=""
              />
            </div>
            <div className="flex gap-[0.6rem]">
              <img
                className="w-[12.3rem]  h-[12.3rem]"
                src="./images/team-page/team-page-hero4.jpg"
                alt=""
              />

              <img
                className="w-[12.3rem]  h-[12.3rem] "
                src="./images/team-page/team-page-hero5.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold mt-[5rem] text-center">
          Meet Our Team
        </h2>
        <div className=" flex flex-col gap-[2rem] w-full justify-center items-center justify-around mt-[6rem] ">
          <div className=" flex flex-col gap-[2rem] md:flex-row w-full justify-center items-center justify-around  ">
            {membersFirstThree.map((member, ind) => {
              return <TeamMember key={ind} member={member} />;
            })}
          </div>
          <div className=" flex flex-col gap-[2rem] md:flex-row w-full justify-center items-center justify-around  ">
            {membersSecondThree.map((member, ind) => {
              return <TeamMember key={ind} member={member} />;
            })}
          </div>
          <div className=" flex flex-col md:flex-row w-full justify-center items-center justify-around  "></div>
        </div>
        <div className="flex flex-col items-center mt-[3rem] gap-[2rem]">
          <h1 className="font-bold text-4xl text-center w-[23rem] md:w-[32rem]">
            Start your 14 days free trial
          </h1>
          <p className="text-center font-bold text-[#737373] w-[15rem] md:w-[26rem]">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent.
          </p>
          <button className="btnBlueWithWhiteText w-[12rem] h-[3rem] font-bold rounded-md">
            Try it free now
          </button>
          <div className="flex gap-[2.4rem] text-3xl text-[#23A6F0] ">
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon className="text-[#395185]" icon={faFacebook} />
            <FontAwesomeIcon className="text-[#000000]" icon={faInstagram} />
            <FontAwesomeIcon className="text-[#0A66C2]" icon={faLinkedin} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
