import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const footerData = [
  {
    title: "Company Info",
    row1: "About us",
    row2: "Career",
    row3: "We are hiding",
    row4: "Blog",
  },
  {
    title: "Legal",
    row1: "About us",
    row2: "Career",
    row3: "We are hiding",
    row4: "Blog",
  },
  {
    title: "Features",
    row1: "Business Marketing",
    row2: "User Analytic",
    row3: "Live Chat",
    row4: "Unlimited Support",
  },
  {
    title: "Resourses",
    row1: "IOS & Android",
    row2: "Watch a demo",
    row3: "Customers",
    row4: "API",
  },
];

export default function Footer() {
  return (
    <>
      <div className="flex flex-col  w-screen md:justify-center items-center mt-[4rem] ">
        <div className="flex flex-col md:flex md:justify-between md:flex-row px-[2rem] md:px-[0rem] gap-[2rem] md:items-center w-screen md:w-[60rem] pb-[2rem] border-b-2 border-gray-200">
          <h2 className="font-bold text-2xl ">Bandage</h2>

          <div className="flex md:flex text-2xl text-[#23A6F0] gap-[1rem]">
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>

        <div className="flex flex-col md:flex md:flex-row w-screen md:w-[60rem] px-[2rem] md:px-[0rem] py-[4rem]  justify-between justify-center md:items-center md:py-[5rem]">
          {footerData.map((item, ind) => {
            return (
              <>
                <div key={ind} className="flex flex-col gap-[0.3rem]">
                  <p className="font-bold">{item.title}</p>
                  <a href="">{item.row1}</a>
                  <a href="">{item.row2}</a>
                  <a href="">{item.row3}</a>
                  <a href="">{item.row4}</a>
                </div>
              </>
            );
          })}

          <div className="flex flex-col mt-[2rem] gap-[2rem] md:mt-[0rem] md:gap-[3.4rem]">
            <p className="font-bold">Get In Touch</p>

            <div className="flex">
              <input
                className=" h-[3rem] border border-b-1 border-gray-300"
                type="text"
                placeholder="   Your email"
              />
              <button className="btnBlueWithWhiteText">Subscribe</button>
            </div>
          </div>
        </div>
        <p className="font-bold text-gray-500 block w-[14rem] text-center md:hidden mb-[2rem]  ">
          Made With Love By Finland All Right Reserved{" "}
        </p>

        <p className="hidden md:block font-bold text-gray-500 mr-[40rem] mb-[2rem]  ">
          Made With Love By Finland All Right Reserved{" "}
        </p>
      </div>
    </>
  );
}
