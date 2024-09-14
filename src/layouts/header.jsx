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
  faBagShopping,
  faBarsStaggered,
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGear,
  faMagnifyingGlass,
  faPhone,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

export default function Header() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { user } = useSelector((state) => state.client);
  const { cart } = useSelector((state) => state.shoppingCart);
  const { pathname } = useLocation();
  const history = useHistory();

  const [hoveredDropDownMenu, setHoveredDropDownMenu] = useState(false);
  const [hoveredCategoriesArea, setHoveredCategoriesArea] = useState(false);

  const { categories } = useSelector((state) => state.product);

  const womenCats = categories.filter((item) => item.gender === "k");
  const menCats = categories.filter((item) => item.gender === "e");

  const navigateShoppingCartPage = () => {
    history.push("/shopping-cart-page");
  };

  const [userDropDownMenu, setUserDropdownMenu] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target.closest(".user-dropdown-menu") === null) {
      setUserDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOutHandler = () => {
    toggle();
    localStorage.clear();
    sessionStorage.clear();

    history.push("/");
    toast.success("Successful exit and we are waiting for you again");
  };

  return (
    <>
      <div className=" hidden md:flex md:flex-col">
        <div
          className={` hidden md:flex md:bg-slate-800 md:h-[3.5rem] md:items-center md:px-[2rem] justify-between ${
            pathname === "/shop" || pathname === "/product-detail"
              ? "md:py-[2rem] md:px-[12em]"
              : ""
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
          pathname === "/shop" || pathname === "/product-detail"
            ? "md:py-[0rem] md:px-[6em]"
            : ""
        }`}
      >
        <div className="flex justify-around items-center mt-[1.4rem] mb-[1.4rem]   md:flex  md:justify-between md:w-screen md:px-[3rem]">
          <div className="md:flex md:justify-between md:grow-[0.4]">
            <h2
              onClick={() => history.push("/")}
              className="font-bold text-xl cursor-pointer "
            >
              Bandage
            </h2>

            <div className="hidden md:flex md:justify-between grow-[0.5] font-bold text-gray-500">
              <button onClick={() => history.push("/")}>Home</button>

              <button
                onClick={() => history.push("/shop")}
                onMouseEnter={() => setHoveredDropDownMenu(true)}
                onMouseLeave={() => setHoveredDropDownMenu(false)}
                className="flex items-center gap-[0.4rem]"
              >
                Shop <FontAwesomeIcon icon={faAngleDown} />
              </button>

              {(hoveredCategoriesArea || hoveredDropDownMenu) && (
                <div
                  onMouseEnter={() => setHoveredCategoriesArea(true)}
                  onMouseLeave={() => setHoveredCategoriesArea(false)}
                  className="flex bg-white absolute top-[6.7rem] left-[17rem] py-[1.3rem] rounded-sm w-[20rem] justify-around z-10"
                >
                  <div className="flex flex-col gap-[2rem] ">
                    <p className="font-bold text-black  text-lg ">Kadın</p>
                    <div className="flex flex-col gap-[1.4rem]">
                      <button className="catAreaBtn">View all</button>

                      {womenCats.map((item, ind) => {
                        return (
                          <button
                            onClick={() =>
                              history.push(
                                `/shop/${item.gender}/${item.code}/${item.id}`
                              )
                            }
                            key={ind}
                            className="catAreaBtn"
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[2rem]">
                    <p className="font-bold text-black text-lg">Erkek</p>
                    <div className="flex flex-col gap-[1.4rem] ">
                      <button className="catAreaBtn">View all</button>
                      {menCats.map((item, ind) => {
                        return (
                          <button
                            onClick={() =>
                              history.push(`shop/${item.gender}/${item.title}`)
                            }
                            key={ind}
                            className="catAreaBtn"
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <button onClick={() => history.push("/about-us")}>About</button>

              <button>Blog</button>
              <button onClick={() => history.push("/team")}>Team</button>
              <button onClick={() => history.push("/contact")}>Contact</button>
              <button>Pages</button>
            </div>
          </div>

          <div className="flex justify-between md:text-[#23A6F0] md:grow-[0.05] items-center ">
            <div className="hidden md:flex ">
              {!user["name"] && (
                <div className="flex items-center gap-[1rem] text-[#23A6F0]">
                  <FontAwesomeIcon icon={faUser} />
                  <button
                    onClick={() => history.push("/login")}
                    className="font-bold"
                  >
                    Login
                  </button>
                  <p className="font-bold">/</p>
                  <button
                    onClick={() => history.push("/signup")}
                    className="font-bold"
                  >
                    Register
                  </button>
                </div>
              )}

              {user["name"] && (
                <div
                  onClick={() => setUserDropdownMenu(!userDropDownMenu)}
                  className="flex cursor-pointer items-center gap-[1rem] text-[#23A6F0]"
                >
                  <img
                    src={user.gravatarUrl}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-bold">{user.name}</p>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              )}

              {userDropDownMenu && (
                <div className="user-dropdown-menu  flex flex-col p-[1rem] gap-[0.5rem] absolute w-[10rem]  border-solid border-2 border-gray-300 bg-white rounded-md top-[7.5rem] right-[9rem] z-10">
                  <div
                    onClick={() => history.push("/previous-orders")}
                    className="catAreaBtn cursor-pointer flex items-center gap-[0.3rem]"
                  >
                    <p>Previous Orders</p>
                    <FontAwesomeIcon icon={faBagShopping} />
                  </div>
                  <div className="catAreaBtn cursor-pointer flex items-center gap-[3.5rem]">
                    <p>Settings</p>
                    <FontAwesomeIcon icon={faGear} />
                  </div>
                  <div
                    onClick={toggle}
                    className="catAreaBtn cursor-pointer flex items-center gap-[3.7rem]"
                  >
                    <p>Log out</p>

                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </div>
                </div>
              )}

              <div>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Exit</ModalHeader>
                  <ModalBody>Are you sure you want to log out ?</ModalBody>
                  <ModalFooter className="flex gap-[3rem]">
                    <button
                      className="btnBlueWithWhiteText rounded-md h-[2rem]"
                      onClick={logOutHandler}
                    >
                      Yes
                    </button>{" "}
                    <button
                      className="btnBlueWithWhiteText rounded-md bg-red-500 h-[2rem]"
                      onClick={toggle}
                    >
                      Cancel
                    </button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>

            <div className="flex justiy-between items-center gap-[1rem] ">
              <FontAwesomeIcon
                className={`${
                  pathname === "/shop" ? "hidden" : "block"
                } md:block`}
                icon={faMagnifyingGlass}
              />

              {cart.length == 0 ? (
                <FontAwesomeIcon
                  onClick={navigateShoppingCartPage}
                  className={` md:block cursor-pointer`}
                  icon={faCartShopping}
                />
              ) : (
                ""
              )}

              {cart.length > 0 ? (
                <div
                  onClick={navigateShoppingCartPage}
                  className="flex gap-[0.4rem] items-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    className={` md:block text-sky-500`}
                    icon={faCartShopping}
                  />

                  <button className="rounded-full text-white font-bold items-center justify-center w-[1.4rem] bg-sky-500">
                    {cart.length}
                  </button>
                </div>
              ) : (
                ""
              )}

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
        <button onClick={() => history.push("/")} className="font-normal">
          Home
        </button>
        <button>Product</button>
        <button onClick={() => history.push("/shop")}>Shop</button>
        <button onClick={() => history.push("/contact")}>Contact</button>
      </div>

      <div
        className={`${
          pathname === "/shop" ? "flex" : "hidden"
        } flex-col gap-[1.5rem] font-bold items-center text-gray-500 md:hidden`}
      >
        <button onClick={() => history.push("/")} className="font-normal">
          Home
        </button>
        <button onClick={() => history.push("/shop")}>Shop</button>
        <button onClick={() => history.push("/about-us")}>About</button>
        <button>Blog</button>
        <button onClick={() => history.push("/contact")}>Contact</button>

        {!user["name"] && (
          <div className="flex items-center gap-[1rem] text-[#23A6F0]">
            <div
              onClick={() => history.push("/login")}
              className="flex items-center gap-[0.5rem]"
            >
              <FontAwesomeIcon icon={faUser} />
              <button className="font-bold">Login</button>
            </div>
            <p className="font-bold">/</p>

            <button
              onClick={() => history.push("/signup")}
              className="font-bold"
            >
              Register
            </button>
          </div>
        )}

        {user["name"] && (
          <div
            onClick={() => setUserDropdownMenu(!userDropDownMenu)}
            className="flex cursor-pointer items-center gap-[1rem] text-[#23A6F0]"
          >
            <div className="flex items-center gap-[0.5rem]">
              <img
                src={user.gravatarUrl}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <p className="font-bold">{user.name}</p>
              <FontAwesomeIcon icon={faChevronUp} />
            </div>
          </div>
        )}

        {userDropDownMenu && (
          <div className="user-dropdown-menu  flex flex-col p-[1rem] gap-[0.5rem] absolute justify-center items-center w-[15rem]  border-solid border-2 border-gray-300 bg-white rounded-md top-[9.5rem] right-[6.5rem] z-10">
            <div
              onClick={() => history.push("/previous-orders")}
              className="catAreaBtn cursor-pointer flex items-center gap-[0.3rem]"
            >
              <p>Previous Orders</p>
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <div className="catAreaBtn cursor-pointer flex items-center gap-[3.5rem]">
              <p>Settings</p>
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div
              onClick={toggle}
              className="catAreaBtn cursor-pointer flex items-center gap-[3.7rem]"
            >
              <p>Log out</p>

              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </div>
        )}

        <div className="flex flex-col text-[#23A6F0] text-lg justiy-between gap-[2rem] ">
          <FontAwesomeIcon className="" icon={faMagnifyingGlass} />
          <FontAwesomeIcon className="" icon={faCartShopping} />
          <FontAwesomeIcon className="" icon={faHeart} />
        </div>
      </div>
    </>
  );
}
