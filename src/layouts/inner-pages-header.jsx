import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function InnerPagesHeader() {
  const history = useHistory();

  return (
    <>
      <div className=" hidden  md:flex justify-around items-center mt-[1.4rem] mb-[1.4rem]   md:flex  md:justify-between md:w-screen md:px-[10rem]">
        <div className="md:flex md:justify-between md:grow-[0.4]">
          <h2
            onClick={() => history.push("/")}
            className="font-bold text-xl cursor-pointer "
          >
            Bandage
          </h2>

          <div className="hidden md:flex md:justify-between grow-[0.5] font-bold text-gray-500">
            <button onClick={() => history.push("/")}>Home</button>

            <button>Product</button>
            <button>Pricing</button>
            <button onClick={() => history.push("/contact")}>Contact</button>
          </div>
        </div>

        <div className="flex gap-[1.7rem]">
          <button className="bg-white text-[#23A6F0] w-[5rem] font-bold">
            Login
          </button>
          <button className="btnBlueWithWhiteText w-[12rem] h-[2.6rem] rounded-sm items-center ">
            Become a member{" "}
            <FontAwesomeIcon className="ml-[1rem]" icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
}
