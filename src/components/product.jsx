import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Product(props) {
  const { item, setCurrentProduct } = props;
  const history = useHistory();

  const navigateToDetailPageHandler = () => {
    history.push("/product-detail-page");
    setCurrentProduct(item);
  };

  return (
    <>
      <div
        onClick={navigateToDetailPageHandler}
        className="flex flex-col gap-[1.1rem] md:flex md:flex-col items-center md:items-center md:w-[17rem]"
      >
        <img className="max-w-[80%]" src={item} alt="" />
        <p className="font-bold text-xl">Grapich Design</p>
        <p className="text-[#737373] font-bold">English Department</p>
        <div className="flex md:flex gap-[1rem]">
          <p className="text-[#BDBDBD] text-2xl font-bold">$16.48</p>
          <p className="text-[#23856D] text-2xl font-bold">$6.56</p>
        </div>
        <div className="flex md:flex gap-[0.4rem]">
          <button className="rounded-full w-[1.4rem] bg-black">.</button>
          <button className="rounded-full w-[1.4rem] bg-green-700">.</button>
          <button className="rounded-full w-[1.4rem] bg-sky-500">.</button>
          <button className="rounded-full w-[1.4rem] bg-amber-500">.</button>
        </div>
      </div>
    </>
  );
}
