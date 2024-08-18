import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faBarsStaggered,
  faCartShopping,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

export default function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <>
      <div className=" hidden md:flex md:flex-col">
        <div
          className={` hidden md:flex md:bg-slate-800 md:h-[3.5rem] md:items-center md:px-[2rem] justify-between ${
            pathname === "/shop" ? "md:py-[2rem] md:px-[12.5em]" : ""
          } `}
        >
          <div className="flex gap-[2rem]">
            <div className="md:flex md:gap-[4px] items-center">
              <FontAwesomeIcon icon={faPhone} style={{ color: "#ededed" }} />
              <p className="text-white">(225 555-0118)</p>
            </div>

            <div className="flex gap-[5px] items-center  text-white">
              <FontAwesomeIcon icon={faEnvelope} />
              <p className="mb-[3px]">teknotik@gmail.com</p>
            </div>
          </div>

          <p className="text-white">
            Follow us and get a change to win 80% off
          </p>

          <div className="flex text-white  items-center gap-[1rem]">
            <p>Follow us</p>
            <p>:</p>

            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faYoutube} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </div>

      <div
        className={`md:flex ${
          pathname === "/shop" ? "md:py-[0rem] md:px-[4em]" : ""
        }`}
      >
        <div className="flex justify-around items-center mt-[1.4rem] mb-[1.4rem]   md:flex  md:justify-between md:w-screen md:px-[3rem]">
          <div className="md:flex md:justify-between md:grow-[0.4]">
            <h2 className="font-bold text-xl ">Bandage</h2>

            <div className="hidden md:flex md:justify-between grow-[0.5] font-bold text-gray-500">
              <button onClick={() => history.push("/")}>Home</button>
              <button
                onClick={() => history.push("/shop")}
                className="flex items-center gap-[0.4rem]"
              >
                Shop <FontAwesomeIcon icon={faAngleDown} />
              </button>
              <button>About</button>
              <button>Blog</button>
              <button>Contact</button>
              <button>Pages</button>
            </div>
          </div>

          <div className="flex justify-between md:text-[#23A6F0] md:grow-[0.05] items-center ">
            <div className="hidden md:flex ">
              <div className="flex items-center gap-[1rem] text-[#23A6F0]">
                <FontAwesomeIcon icon={faUser} />

                <button className="font-bold">Login</button>
                <p className="font-bold">/</p>
                <button className="font-bold">Register</button>
              </div>
            </div>

            <div className="flex justiy-between gap-[2rem] ">
              <FontAwesomeIcon
                className={`${
                  pathname === "/shop" ? "hidden" : "block"
                } md:block`}
                icon={faMagnifyingGlass}
              />
              <FontAwesomeIcon
                className={`${
                  pathname === "/shop" ? "hidden" : "block"
                } md:block`}
                icon={faCartShopping}
              />
              <FontAwesomeIcon className="hidden md:block" icon={faHeart} />
              <FontAwesomeIcon className="md:hidden" icon={faBarsStaggered} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={` flex flex-col ${
          pathname === "/shop" ? "hidden" : ""
        } gap-[1.5rem] font-bold text-gray-500 md:hidden`}
      >
        <button className="font-normal">Home</button>
        <button>Product</button>
        <button>Pricing</button>
        <button>Contact</button>
      </div>

      <div
        className={`${
          pathname === "/shop" ? "flex" : "hidden"
        } flex-col gap-[1.5rem] font-bold items-center text-gray-500 md:hidden`}
      >
        <button className="font-normal">Home</button>
        <button>Shop</button>
        <button>About</button>
        <button>Blog</button>
        <button>Contact</button>

        <div className="flex items-center gap-[1rem] text-[#23A6F0]">
          <FontAwesomeIcon icon={faUser} />

          <button className="font-bold">Login</button>
          <p className="font-bold">/</p>
          <button className="font-bold">Register</button>
        </div>

        <div className="flex flex-col text-[#23A6F0] text-lg justiy-between gap-[2rem] ">
          <FontAwesomeIcon className="" icon={faMagnifyingGlass} />
          <FontAwesomeIcon className="" icon={faCartShopping} />
          <FontAwesomeIcon className="" icon={faHeart} />
        </div>
      </div>
    </>
  );
}
