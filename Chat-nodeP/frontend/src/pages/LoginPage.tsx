import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { login } from "../lib/api";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending, error } = useMutation<unknown, AxiosError<{ message: string }>, typeof loginData>({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),

  });
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation(loginData, {
      onSuccess: () => {
        navigate("/");
      }
    });
  }
  return (
    <div className="h-screen align-middle items-center flex justify-center" data-theme="forest">
      <div className="w-100 h-auto rounded-xl bg-amber-500">
        <form onSubmit={handleLogin} className="p-10 flex flex-col">
          {
            error &&
            <div className="alert alert-error mb-4">
              <span>{error.response?.data.message}</span>
            </div>
          }
          <div className="w-full font-bold text-3xl m-auto text-center ">Welcome Back in login page</div>
          <label className="label">
            <span className="text-white text-sm py-2">Email</span>
          </label>
          <input type="email" placeholder="Enter User Name"
            className="input input-borered placeholder:text-amber-200"
            value={loginData.email}
            onChange={(e) => setLoginData({
              ...loginData, email: e.target.value
            })}
          />
          <label className="label">
            <span className="text-white text-sm py-2">Password</span>
          </label>
          <input type="password" placeholder="Enter User Name"
            className="input input-borered placeholder:text-amber-200"
            value={loginData.password}
            onChange={(e) => setLoginData({
              ...loginData, password: e.target.value
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
              "login"
            )}
          </button>
          <div className="text-center mt-4">
            <p>Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage