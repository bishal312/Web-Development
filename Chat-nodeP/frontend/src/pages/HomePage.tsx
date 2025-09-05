import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/api";
import { Link } from "react-router";

type User = {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
};

const HomePage = () => {
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="card bg-base-200 shadow-md rounded-2xl p-4 flex flex-col items-center text-center"
        >
          <img
            src={`http://localhost:5000/uploads/${user?.profilePic}`}
            alt={user.username}
            className="w-20 h-20 rounded-full mb-4 object-contain"
          />
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-sm text-gray-500 mb-3">{user.email}</p>
          <Link to={`/chat/${user._id}`} className="btn btn-outline w-full">
            Chat Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
