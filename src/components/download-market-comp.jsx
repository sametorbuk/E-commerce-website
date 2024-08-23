import {
  faAmazon,
  faApple,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DownloadMarketComponent(props) {
  const { color, market } = props;

  return (
    <>
      {color === "black" && market === "google" && (
        <div className="flex w-[13rem] md:w-[17rem] h-[5rem] text-white text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-stone-800">
          <FontAwesomeIcon className="text-4xl" icon={faGooglePlay} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>Google Play</p>
          </div>
        </div>
      )}

      {color === "white" && market === "google" && (
        <div className="flex w-[13rem] md:w-[17rem] h-[5rem] text-black text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-white">
          <FontAwesomeIcon className="text-4xl" icon={faGooglePlay} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>Google Play</p>
          </div>
        </div>
      )}

      {color === "black" && market === "apple" && (
        <div className="flex  w-[13rem] md:w-[17rem] h-[5rem] text-white text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-stone-800">
          <FontAwesomeIcon className="text-4xl" icon={faApple} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>App Store</p>
          </div>
        </div>
      )}

      {color === "white" && market === "apple" && (
        <div className="flex w-[13rem] md:w-[17rem] h-[5rem] text-black text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-white">
          <FontAwesomeIcon className="text-4xl" icon={faApple} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>App Store</p>
          </div>
        </div>
      )}

      {color === "black" && market === "amazon" && (
        <div className="flex w-[13rem] md:w-[17rem] h-[5rem] text-white text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-stone-800">
          <FontAwesomeIcon className="text-4xl" icon={faAmazon} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>Amazon.com</p>
          </div>
        </div>
      )}

      {color === "white" && market === "amazon" && (
        <div className="flex w-[13rem] md:w-[17rem] h-[5rem] text-black text-md md:text-xl rounded-lg p-[1rem] items-center gap-[1rem] bg-white">
          <FontAwesomeIcon className="text-4xl" icon={faAmazon} />

          <div className="flex flex-col">
            <p className="font-bold">Download on the</p>
            <p>Amazon.com</p>
          </div>
        </div>
      )}
    </>
  );
}
