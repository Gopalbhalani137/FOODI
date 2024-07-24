import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeProvider";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signInWithGoogle, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("http://localhost:3000/users", userInfor)
          .then(() => {
            alert("Welcome " + user.displayName);
            navigate(from, { replace: true });
          }).catch((error) => {
            if (error.response.status === 302) {
              alert("Welcome " + user.displayName);
              document.getElementById("my_modal_5").close();
            } else {
              console.error("Error saving user information:", error);
              setErrorMessage("An error occurred while saving user information. Please try again.");
            }
          });
      })
      .catch((error) => {
        setErrorMessage("Please provide valid email & password!");
      });
      reset()
  };

  const handleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const userInfor = {
        name: user?.displayName,
        email: user?.email,
      };
      try {
        const response = await axios.post("http://localhost:3000/users", userInfor);
        if (response.status === 200 || response.status === 302) {
          document.getElementById("my_modal_5").close();
          alert("Welcome " + user.displayName);
          navigate("/");
        }
      } catch (error) {
        console.error("Error saving user information:", error);
        if (error.response.status === 302) {
          document.getElementById("my_modal_5").close();
          alert("Welcome " + user.displayName);
          navigate("/");
        } else {
          alert("An error occurred while saving user information. Please try again.");
        }
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert("An error occurred during Google Sign-In. Please try again.");
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg text-black">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered text-black"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered text-black"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage && (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-yellow text-white hover:bg-yellow"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>
            <p className="text-center my-2 text-black">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
