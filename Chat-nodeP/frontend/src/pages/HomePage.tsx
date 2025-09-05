import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/api";

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
            src={user.profilePic || "/default-avatar.png"}
            alt={user.username}
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-sm text-gray-500 mb-3">{user.email}</p>
          <button className="btn btn-primary w-full">Chat</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
