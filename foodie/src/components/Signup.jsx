import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signInWithGoogle, createUser, updateUserProfile } =
  useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfor)
            .then(() => {
              alert("Welcome " + user.displayName);
              navigate(from, { replace: true });
            }).catch((error) => {
              if (error.response.status === 302) {
                alert("Welcome " + user.displayName);
                navigate(from, { replace: true });
              } else {
                console.error("Error saving user information:", error);
                setErrorMessage("An error occurred while saving user information. Please try again.");
              }
            });
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // login with google
  const handleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then(() => {
            alert("welcome " + user.displayName);
            navigate("/");
          }).catch((error) => {
            if (error.response.status === 302) {
              alert("Welcome " + user.displayName);
              navigate(from, { replace: true });
            } else {
              console.error("Error saving user information:", error);
              setErrorMessage("An error occurred while saving user information. Please try again.");
            }
          });
      })
      .catch((error) => {setErrorMessage("Please provide valid email & password!");});
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          <p>{errors.message}</p>

          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-yellow hover:bg-yellow text-white"
              value="Sign up"
            />
          </div>

          <div className="text-center my-2 text-black">
            Have an account?
            <button
              className="ml-2 underline text-black"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login here
            </button>
          </div>
        </form>
        <div className="text-center space-x-3">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleRegister}
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
  );
};

export default Signup;
