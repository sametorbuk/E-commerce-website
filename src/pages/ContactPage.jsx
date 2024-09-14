import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import InnerPagesHeader from "../layouts/inner-pages-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faMagnifyingGlass,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ContactCard from "../components/contact-card";
import Footer from "../layouts/footer";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const icons = [faPhone, faLocationDot, faEnvelope];

export default function ContactPage() {
  const { cart } = useSelector((state) => state.shoppingCart);
  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <>
      <InnerPagesHeader />

      <main className=" flex-col  md:flex md:flex-col items-center justify-center  md:px-[5rem] gap-[2rem]">
        <div className="flex md:hidden justify-around items-center mt-[1.4rem] mb-[1.4rem]   md:flex  md:justify-between md:w-screen md:px-[3rem]">
          <div className=" md:flex md:justify-between md:grow-[0.4]">
            <h2
              onClick={() => history.push("/")}
              className="font-bold text-xl cursor-pointer "
            >
              Bandage
            </h2>
          </div>

          <div className="flex justiy-between items-center gap-[2rem] ">
            <FontAwesomeIcon
              className="text-sky-500"
              icon={faMagnifyingGlass}
            />

            {cart.length == 0 ? (
              <FontAwesomeIcon
                onClick={() => history.push("/shopping-cart-page")}
                className={`${
                  pathname === "/shop" ? "hidden" : "block"
                } md:block cursor-pointer`}
                icon={faCartShopping}
              />
            ) : (
              ""
            )}

            {cart.length > 0 ? (
              <div
                onClick={() => history.push("/shopping-cart-page")}
                className="flex gap-[0.4rem] items-center cursor-pointer"
              >
                <FontAwesomeIcon
                  className={`${
                    pathname === "/shop" ? "hidden" : "block"
                  } md:block text-sky-500`}
                  icon={faCartShopping}
                />

                <button className="rounded-full text-white font-bold text-center justify-center w-[1.4rem] bg-sky-500">
                  {cart.length}
                </button>
              </div>
            ) : (
              ""
            )}

            <FontAwesomeIcon className="hidden md:block" icon={faHeart} />
          </div>
        </div>

        <div className="flex flex-col md:hidden text-xl md:justify-between gap-[2rem] grow-[0.5] font-bold text-gray-500 mt-[4.5rem]">
          <button onClick={() => history.push("/")}>Home</button>

          <button>Product</button>
          <button>Pricing</button>
          <button onClick={() => history.push("/contact")}>Contact</button>
        </div>

        <div className="flex flex-col md:flex-row justify-betwen items-center mt-[4rem] md:mt-[0rem]">
          <div className="flex flex-col md:p-[5rem] 2xl:p-[8rem] font-bold gap-[2rem] md:absolute  items-center md:items-start w-[25rem] md:w-[40%]">
            <h3 className="text-xl  ">CONTACT US</h3>

            <h2 className=" block md:hidden text-5xl text-center ">
              Get touch in today !
            </h2>

            <h2 className=" hidden md:block text-5xl  ">
              Get touch in today !
            </h2>

            <p className=" block md:hidden text-[#737373] w-[15rem] text-center ">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </p>

            <p className="hidden md:block text-[#737373] w-[15rem]  ">
              We know how large objects will act, but things on a small scale
            </p>

            <p className="text-xl">Phone ; +451 215 215 </p>
            <p className="text-xl">Fax : +451 215 215</p>

            <div className="flex gap-[1.5rem] text-2xl ">
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>

          <img
            className="m-[2rem] mr-[12rem] md:m-[0rem]"
            src="./images/contact-page/hero-2-bg-shape-cover.png"
            alt=""
          />
        </div>

        <div className="flex  flex-col items-center gap-[1rem] mb-[3.8rem]">
          <h4 className="font-bold">VISIT OUR OFFICE</h4>
          <h2 className="font-bold  text-2xl w-[15rem] md:text-4xl  text-center md:w-[30rem]">
            We help small businesses with big ideas
          </h2>
        </div>

        <div className="flex flex-col md:flex-row p-[1rem] md:p[0rem] w-full">
          {icons.map((ic) => (
            <ContactCard ic={ic} key={ic} />
          ))}
        </div>

        <div className="flex flex-col w-full items-center text-2xl font-bold gap-[2rem] mt-[5rem] mb-[5.5rem]">
          <img
            className="w-[4rem]"
            src="./images/contact-page/Arrow.png"
            alt=""
          />
          <p>WE Can't WAIT TO MEET YOU</p>
          <h1 className="text-7xl">Let’s Talk</h1>
          <button className="btnBlueWithWhiteText w-[19rem] h-[4rem] rounded-md">
            Try it free now
          </button>
        </div>

        <Footer />
      </main>
    </>
  );
}
