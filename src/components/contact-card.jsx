import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactCard(props) {
  const { ic } = props;
  return (
    <>
      <div
        className={`flex flex-col grow-[0.33] p-[2rem] gap-[1.5rem] items-center font-bold text-lg ${
          ic === faLocationDot ? "bg-[#252B42] text-white" : ""
        }  `}
      >
        <FontAwesomeIcon
          className="text-7xl"
          icon={ic}
          style={{ color: "#3d79e1" }}
        />
        <p>georgia.young@example.com</p>
        <p>georgia.young@ple.com</p>
        <p>Get Support</p>

        <button
          className={`  ${
            ic === faLocationDot ? "bg-[#252B42]" : "bg-white"
          } w-[17rem] h-[4.3rem]  rounded-full text-[#23A6F0]  border-2 border-sky-500`}
        >
          Submit Request
        </button>
      </div>
    </>
  );
}
