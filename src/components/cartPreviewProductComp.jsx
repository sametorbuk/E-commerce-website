export default function CartPreviewProduct({ item }) {
  const { count, product } = item;
  const { description, price } = product;
  return (
    <>
      <div className="flex gap-[1rem] mt-[1rem] items-center">
        <img className="w-[4rem] h-[5rem]" src={product.images[0].url} alt="" />

        <div className="flex flex-col gap-[0.2rem]">
          <h2>{description}</h2>

          <div className="flex">
            <p className="text-gray-400 font-bold">Adet: {count}</p>
          </div>

          <p className="text-xl text-sky-500">{price} TL</p>
        </div>
      </div>
    </>
  );
}
