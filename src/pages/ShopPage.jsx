import {
  faChevronRight,
  faList,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../App.css";
import Product from "../components/product";
import Footer from "../layouts/footer";
import {
  faAws,
  faHooli,
  faLyft,
  faPiedPiperHat,
  faRedditAlien,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAxios from "../hooks/useAxios";
import { setOffset, setProductList } from "../redux/productSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProducts } from "../thunk/fetchProductsThunk";

export default function ShopPage(props) {
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();
  const { setCurrentProduct, setWillNavigateCurrentCategory } = props;

  const { categories, fetchState, productList, offset } = useSelector(
    (state) => state.product
  );

  const sortedCategories = [...categories].sort((a, b) => b.rating - a.rating);
  const topFiveCategories = sortedCategories.slice(0, 5);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts("/products"));
    } else {
      return;
    }
  }, []);

  const categoryNavigateHandler = (item) => {
    setWillNavigateCurrentCategory(item);

    history.push(`/shop/${item.gender}/${item.code}/${item.id}`);
  };

  const [filterInputValue, setFilterInputValue] = useState("");

  const filterOnChangeHandler = (e) => {
    const { value } = e.target;

    setFilterInputValue(value);
  };

  const [filterClicked, setFilterClicked] = useState(false);

  const [sortValue, setSortValue] = useState("");

  const sortValueHandler = (e) => {
    const { value } = e.target;
    setSortValue(value);
  };
  const {
    MakeRequest: sendRequest,
    METHODS: chooseMethods,
    loading,
    setLoading,
  } = useAxios();

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setLoading(true);
      sendRequest({
        url: `products?${
          filterInputValue ? "&filter=" + filterInputValue : ``
        }${sortValue ? "&sort=" + sortValue : ""}&limit=12&offset=${offset}`,
        method: chooseMethods.GET,
      })
        .then((responseData) => {
          dispatch(setProductList([...productList, ...responseData.products]));
          setHasMore(responseData.products.length > 0);
          console.log(productList);
          dispatch(setOffset(offset + 12));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setProductList([]));
    dispatch(setOffset(0));
    setOffset(0);
    dispatch(
      fetchProducts(
        `/products?${filterInputValue ? "&filter=" + filterInputValue : ``}${
          sortValue ? "&sort=" + sortValue : ""
        }`
      )
    );
  }, [sortValue, filterClicked]);

  return (
    <>
      <Header />

      <main className=" flex-col  md:flex md:flex-col items-center justify-center  md:px-[5rem] gap-[2rem]">
        <div className="flex flex-col mt-[2rem] gap-[2rem]  items-center md:flex-row w-full justify-between">
          <h2 className="font-bold text-xl">Shop</h2>

          <div className="flex items-center font-bold gap-[1rem] text-md">
            <p>Home</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#9e9e9e" }}
            />
            <p className="text-[#9e9e9e]">Shop</p>
          </div>
        </div>

        <section className="flex items-center mt-[3rem] md:mt-[0rem] gap-[1rem]  md:gap-[1rem] flex-col md:flex-row justify-between">
          {topFiveCategories.map((item, ind) => {
            const imgUrl = item.img;

            return (
              <div
                onClick={() => categoryNavigateHandler(item)}
                key={ind}
                className="relative w-[13rem] h-[10rem] cursor-pointer"
              >
                <div
                  style={{ backgroundImage: `url(${imgUrl})` }}
                  className="absolute inset-0 bg-cover  bg-center"
                >
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                <div className="relative flex justify-center items-center h-full text-white">
                  <div className="flex flex-col items-center">
                    <h2 className="font-bold text-xl">
                      {item.gender == "k" ? "Kadın" : "Erkek"}
                    </h2>
                    <p className="font-bold text-md">{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="flex flex-col md:flex md:flex-row justify-center gap-[1rem] justify-between mt-[2rem] w-full items-center  ">
          <p className="text-[#737373] font-bold">Showing all 12 results </p>

          <div className="flex gap-[1rem]  items-center ">
            <p className="text-[#737373] font-bold ">Views:</p>
            <button className="p-[0.7rem] border border-gray-300 rounded-md ">
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </button>
            <button className="p-[0.7rem] border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>

          <div className="flex gap-[1.5rem] items-center">
            <label className="mr-[1rem] font-bold" htmlFor="role_id">
              Sort:
            </label>
            <select
              onChange={sortValueHandler}
              value={sortValue}
              defaultValue=""
              className="w-[7rem] mb-[3rem] items-center mt-[3rem]"
            >
              <option id="role_id" value="">
                Select
              </option>
              <option id="role_id" value="price:asc">
                Price Asc
              </option>
              <option id="role_id" value="price:desc">
                Price Desc
              </option>
              <option id="role_id" value="rating:asc">
                Rating Asc
              </option>
              <option id="role_id" value="rating:desc">
                Rating Desc
              </option>
            </select>

            <input
              onChange={filterOnChangeHandler}
              type="text"
              placeholder=" Filter"
              className=" text-black font-bold p-[0.5rem] w-[6rem] rounded-md bg-gray-300"
            ></input>

            <button
              onClick={() => setFilterClicked(!filterClicked)}
              className=" text-white font-bold p-[0.5rem] w-[6rem] rounded-md bg-[#23A6F0]"
            >
              Filter
            </button>
          </div>
        </div>

        {fetchState === "FETCHING" && <div className="loading-spinner"></div>}

        <InfiniteScroll
          dataLength={productList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>No more items to show</p>
          }
        >
          <div className="flex flex-col gap-[2rem] items-center justify-around ">
            <div className="flex flex-col w-screen md:flex md:w-screen md:flex-col gap-[2rem] px-[3.5rem]  md:gap-[5rem] items-center md:w-screen mt-[4rem] md:mt-[2rem]  ">
              <div className="product-container">
                {productList.map((item) => (
                  <div key={item.id} className="product-item">
                    <Product
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </main>

      <div className="flex flex-col md:flex-row justify-center items-center   text-8xl mt-[3rem]  gap-[2rem] md:gap-[3.5rem]  text-gray-500">
        <FontAwesomeIcon icon={faHooli} />

        <FontAwesomeIcon icon={faLyft} />
        <FontAwesomeIcon icon={faPiedPiperHat} />
        <FontAwesomeIcon icon={faStripe} />
        <FontAwesomeIcon icon={faAws} />
        <FontAwesomeIcon icon={faRedditAlien} />
      </div>

      <Footer />
    </>
  );
}
