import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { loginUser } from "../thunk/postUserThunk";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const { user } = useSelector((state) => state.client);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = (data) => {
    const formData = { ...data, rememberMe };
    console.log(formData);
    dispatch(loginUser(formData))
      .then((response) => {
        console.log(response);
        if (response.payload.token) {
          history.goBack();
          toast.success(`Merhaba, hoşgeldin ${response.payload.name}!`);
        } else {
          toast.warning("Login failed! Please check your details.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              Nice to see you again
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[2rem] mt-[3rem] items-center"
            >
              <div className="flex flex-col  gap-[0.4rem]">
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-[19rem]  md:w-[25.1rem] h-[3rem] bg-gray-300 rounded-lg"
                  type="email"
                  id="email"
                  placeholder="     Enter email"
                  {...register("email", {
                    required: "Email field should not be empty",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email is required",
                    },
                  })}
                />

                {errors.email && (
                  <p className="font-bold text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-[0.4rem]">
                <label className="font-bold" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-[19rem]  md:w-[25.1rem] h-[3rem] bg-gray-300 rounded-lg"
                  type="password"
                  id="password"
                  placeholder="     Enter password"
                  {...register("password", {
                    required: "Password field should not be empty",
                  })}
                />

                {errors.password && (
                  <p className="font-bold text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex gap-[0.4rem] w-[19rem]  md:w-[25.1rem] justify-between">
                <div className="flex gap-[0.3rem]">
                  <label className="switch ">
                    <input
                      onClick={() => setRememberMe(!rememberMe)}
                      id="checkbox"
                      type="checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                  <label htmlFor="checkbox">Remember me</label>
                </div>

                <p className="text-[#007AFF] forgotPassword">
                  Forgot your password ?
                </p>
              </div>

              <div className="flex flex-col justify-center gap-[2.5rem]">
                <button
                  className="btnBlueWithWhiteText w-[19rem]  md:w-[25.1rem] rounded-lg  cursor-pointer h-[2.5rem] font-bold"
                  disabled={!isValid}
                  type="submit"
                >
                  Sign in
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
                  <p>Dont have an account ?</p>

                  <p
                    onClick={() => history.push("/signup")}
                    className="text-[#007AFF] forgotPassword"
                  >
                    Sign up now
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
