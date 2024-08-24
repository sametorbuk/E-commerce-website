import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DownloadMarketComponent from "../components/download-market-comp";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const { MakeRequest, data = [], METHODS } = useAxios();
  const [selectedRoleId, setSelectedRoleId] = useState(3);
  const history = useHistory();
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role_id: 3,
      storeName: "",
      storePhone: "",
      storeTaxId: "",
      storeBankAccount: "",
    },
    mode: "all",
  });

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  useEffect(() => {
    MakeRequest({ url: "/roles", method: METHODS.GET });
  }, []);

  console.log(data);

  const formData = getValues();
  console.log(formData);

  const theFormDataRequiredFormat = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role_id: formData.role_id,
    store: {
      name: formData.storeName,
      phone: formData.storePhone,
      tax_no: formData.storeTaxId,
      bank_account: formData.storeBankAccount,
    },
  };

  console.log(theFormDataRequiredFormat);

  const onSubmit = async () => {
    const Request = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data submitted successfully");
      }, 3000);
    });

    try {
      await toast.promise(Request, {
        pending: {
          render() {
            return (
              <div className="spinner-container">
                <div className="spinner"></div>
                <span>Receiving user registration...</span>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            toast.warning(
              "You need to click link in email to activate your account!"
            );
            history.goBack();
            return "Registration received successfully";
          },
          icon: "🟢",
        },
        error: {
          render({ data }) {
            return `Registration failed: ${data.message}`;
          },
          icon: "🔴",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <main className="bg-sky-700 bg-opacity-85 flex w-screen h-screen  md:px-[9rem] md:py-[3rem]">
        <div className="flex flex-col md:flex-row  items-center shine-border w-full bg-sky-900 h-full rounded-3xl">
          <div className="hidden order-[1] mt-[3rem] mb-[2rem]  md:mt-[0rem] md:ml-[4.6rem] md:flex flex-col gap-[1rem] 2xl:gap-[5rem]">
            <DownloadMarketComponent color="black" market="google" />
            <DownloadMarketComponent color="black" market="apple" />
            <DownloadMarketComponent color="black" market="amazon" />
          </div>
          <div className="w-[68%] scrollable-div static md:absolute   md:left-[26rem] h-[100.3%] bg-white rounded-l-3xl rounded-r-sm md:rounded-r-sm md:rounded-l-3xl p-[2rem] md:p-[4rem]">
            <div className="w-full flex justify-center items-center mb-[3rem]">
              <h2 className="text-2xl font-bold text-center">
                WELCOME TO THE BANDAGE
              </h2>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block  font-bold text-gray-700"
                >
                  Name
                </label>
                <input
                  className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name field should not be empty",
                    minLength: {
                      value: 3,
                      message: "Name must at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className=" font-bold  text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block  font-bold text-gray-700"
                >
                  E mail
                </label>
                <input
                  className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "Email field should not be empty",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="font-bold text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block  font-bold  text-gray-700"
                >
                  Password
                </label>
                <input
                  className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                  type="text"
                  id="password"
                  {...register("password", {
                    required: "Password field should not be empty",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one number, and one special character.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="font-bold  text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Controller
                name="role_id"
                control={control}
                defaultValue={3}
                render={({ field }) => (
                  <>
                    <label className="mr-[2rem] font-bold" htmlFor="role_id">
                      Role:
                    </label>
                    <select
                      className="w-[7rem] mb-[3rem]"
                      {...field}
                      onChange={(e) => {
                        setSelectedRoleId(e.target.value);
                        field.onChange(e);
                      }}
                    >
                      {data !== null ? (
                        data.map((option) => {
                          return (
                            <option
                              id="role_id"
                              key={option.id}
                              value={option.id}
                            >
                              {option.code}
                            </option>
                          );
                        })
                      ) : (
                        <option id="role_id" value={3}>
                          customer
                        </option>
                      )}
                    </select>
                  </>
                )}
              />
              {console.log(selectedRoleId)}

              {selectedRoleId == 2 && (
                <div className="text-black  font-bold mt-[3rem] ">
                  <div className="mb-4">
                    <label
                      htmlFor="storeName"
                      className="block  font-bold  text-gray-700"
                    >
                      Store name
                    </label>
                    <input
                      className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                      type="text"
                      id="storeName"
                      {...register("storeName", {
                        required: "Store Name field should not be empty",
                        minLength: {
                          value: 3,
                          message: "Store name must at least 3 characters",
                        },
                      })}
                    />
                    {errors.storeName && (
                      <p className="text-red-500">{errors.storeName.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="storePhone"
                      className="block  font-bold  text-gray-700"
                    >
                      Store phone
                    </label>
                    <input
                      className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                      type="text"
                      id="storePhone"
                      {...register("storePhone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+90|90)?5\d{9}$/,
                          message: "Please enter a valid Turkish phone number.",
                        },
                      })}
                    />
                    {errors.storePhone && (
                      <p className="text-red-500">
                        {errors.storePhone.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="storeTaxId"
                      className="block  font-bold  text-gray-700"
                    >
                      Store Tax Id
                    </label>
                    <input
                      className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                      type="text"
                      id="storeTaxId"
                      {...register("storeTaxId", {
                        required: "Tax id is required",
                        pattern: {
                          value: /^T\d{4}[A-Z]\d{6}$/,
                          message:
                            "Please enter a valid Tax ID in the format TXXXXVXXXXXX",
                        },
                      })}
                    />
                    {errors.storeTaxId && (
                      <p className="text-red-500">
                        {errors.storeTaxId.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="storeBankAccount"
                      className="block  font-bold  text-gray-700"
                    >
                      Bank Account
                    </label>
                    <input
                      className="bg-gray-200 border border-gray-300 p-2 rounded w-full"
                      type="text"
                      id="storeBankAccount"
                      {...register("storeBankAccount", {
                        required: "Bank account is required",
                        pattern: {
                          value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
                          message: "Please enter a valid IBAN number.",
                        },
                      })}
                    />
                    {errors.storeBankAccount && (
                      <p className="text-red-500">
                        {errors.storeBankAccount.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <button
                className="bg-sky-700  w-[8rem] h-[2rem] text-white font-bold rounded-lg"
                type="submit"
                disabled={!isValid}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
