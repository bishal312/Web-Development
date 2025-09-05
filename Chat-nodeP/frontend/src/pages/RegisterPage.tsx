import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { register } from "../lib/api";
import type { AxiosError } from "axios";

const RegisterPage = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    role: "",
    profilePic: null as File | null,
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: registerMutation, isPending, error } = useMutation<unknown, AxiosError<{ message: string }>, typeof signUpData>({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation(signUpData, {
      onSuccess: () => {
        navigate("/login");
      }
    })
  };

  return (
    <div className="h-screen align-middle items-center flex justify-center" data-theme="forest">
      <div className="w-100 h-auto rounded-xl bg-amber-500">
        <form onSubmit={handleSignUp} className="p-10 flex flex-col">
          {
            error &&
            <div className="alert alert-error mb-4">
              <span>{error.response?.data.message}</span>
            </div>
          }
          <div className="w-full font-bold text-3xl m-auto text-center ">Register</div>
          <label className="label">
            <span className="text-white text-sm py-2">User Name</span>
          </label>
          <input type="text" placeholder="Enter User Name"
            className="input input-borered placeholder:text-amber-200"
            value={signUpData.username}
            onChange={(e) => setSignUpData({
              ...signUpData, username: e.target.value
            })}
          />
          <label className="label">
            <span className="text-white text-sm py-2">Role</span>
          </label>
          <select
            id="role"
            name="role"
            value={signUpData.role}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                role: e.target.value,
              })
            }
            className="bg-black"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>


          <label className="label">
            <span className="text-white text-sm py-2">Profile Picture</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                profilePic: e.target.files ? e.target.files[0] : null,
              })
            }
          />

          <label className="label">
            <span className="text-white text-sm py-2">Email</span>
          </label>
          <input type="email" placeholder="Enter Your Email"
            className="input input-borered placeholder:text-amber-200"
            value={signUpData.email}
            onChange={(e) => setSignUpData({
              ...signUpData, email: e.target.value
            })}
          />
          <label className="label">
            <span className="text-white text-sm py-2">Password</span>
          </label>
          <input type="password" placeholder="Enter Your Password"
            className="input input-borered placeholder:text-amber-200"
            value={signUpData.password}
            onChange={(e) => setSignUpData({
              ...signUpData, password: e.target.value
            })}
          />
          <div className="w-full font-bold text-3xl  mt-5 text-center ">Nepali Pool</div>
          <div className="w-full text-base  my- text-center ">Powered by Masala</div>
          <button className="btn btn-primary w-full" type="submit">
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
          <div className="text-center mt-4">
            <p>Alreay have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage