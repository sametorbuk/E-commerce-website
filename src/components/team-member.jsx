import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TeamMember(props) {
  const { member } = props;
  return (
    <>
      <div className="flex flex-col gap-[1.5rem] items-center">
        <img className="w-[12rem] h-[12rem]" src={member.src} alt="" />
        <div className="flex flex-col gap-[1rem] items-center">
          <p className="font-bold">{member.name}</p>
          <p className="font-bold text-[#737373]">{member.profession}</p>

          <div className="flex gap-[0.7rem] text-xl text-[#23A6F0] ">
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </div>
      </div>
    </>
  );
}
