export default function CreditCard({ data }) {
  const { expiryDateMonth, expiryDateYear, cardNo } = data;
  return (
    <>
      <div className="mt-[2rem] p-[1rem] px-[1.5rem] w-[18rem] flex flex-col gap-[1.5rem] border-2 border-solid border-blue-600 rounded-lg">
        <p className="font-bold text-xl">Credit Card</p>
        <p className="text-blue-500">{cardNo}</p>

        <div className="flex w-full justify-between">
          <p className="text-red-500">İsim soyisim</p>

          <div className="flex text-green-600">
            <p>{expiryDateMonth}</p>
            <p>/</p>
            <p>{expiryDateYear}</p>
          </div>
        </div>
      </div>
    </>
  );
}
