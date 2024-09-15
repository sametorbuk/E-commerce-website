import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../thunk/fetchRolesThunk";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.client);
  const { fetchState } = useSelector((state) => state.product);
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
    if (fetchState === "NOT_FETCHED") {
      dispatch(
        fetchRoles("https://workintech-fe-ecommerce.onrender.com/roles")
      );
    }
    console.log(roles);
  }, [dispatch, fetchState]);

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
      <main className="flex flex-col  md:flex md:flex-row  justify-center  md:px-[5rem] ">
        <img
          className="hidden md:block w-[60%] rounded-xl"
          src="./images/login-page/login-page-img.jpg"
          alt=""
        />

        <div className="flex-flex-col w-full md:w-[40%] p-[1.5rem] ">
          <h2
            onClick={() => history.push("/")}
            className="font-bold cursor-pointer text-3xl text-center md:text-left"
          >
            Bandage
          </h2>

          <div className="flex flex-col mt-[3rem]">
            <h3 className="font-bold text-xl text-center md:text-left ">
              Welcome to the Bandage
            </h3>

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
                      {roles[0] != null ? (
                        roles[0].map((option) => {
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
                <div className="text-black  font-bold  ">
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
              <div className="flex flex-col justify-center gap-[2.5rem]">
                <button
                  className="btnBlueWithWhiteText w-[19rem]  md:w-[25.1rem] rounded-lg  cursor-pointer h-[2.5rem] font-bold"
                  disabled={!isValid}
                  type="submit"
                >
                  Sign up
                </button>

                <button className="w-[19rem]  md:w-[25.1rem] text-white rounded-lg bg-[#1b1b1b]  flex justify-center items-center gap-[0.5rem]  cursor-pointer h-[2.5rem] ">
                  <img
                    className="w-[2rem] bg-black"
                    src="./images/login-page/google-logo-black.png"
                    alt=""
                  />
                  Or sign in with Google
                </button>

                <div className="w-[19rem]  md:w-[25.1rem]  flex justify-around">
                  <p>Do you already have an account ?</p>

                  <p
                    onClick={() => history.push("/login")}
                    className="text-[#007AFF] forgotPassword"
                  >
                    Sign in now
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
