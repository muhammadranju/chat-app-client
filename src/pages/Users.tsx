import UserListSkeleton from "@/components/chat/UserListSkeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/base_url";
import type { User } from "@/types/types";
import axios from "axios";
import { MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [navigate]);

  // Filter users by search
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-16">
      <Helmet>
        <title>Users - Chat App</title>
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Select a User to Chat
        </h1>
        <p className="text-center text-gray-400">
          Connect instantly with friends and colleagues.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-2">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1  placeholder-black"
        />
        <Button className="bg-black border-none cursor-pointer">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Users List Card */}
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="border-b border-black">
          <CardTitle>Available Users</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 mb-3 rounded-lg border hover:bg-gray-700/5 transition cursor-pointer"
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="border border-gray-600">
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-400 text-sm">Online</p>
                  </div>
                </div>
                <Button className=" border-none flex items-center gap-1 cursor-pointer">
                  Chat Now <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-2 text-gray-500">
              <UserListSkeleton />
              <UserListSkeleton />
              <UserListSkeleton />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-primary-foreground p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-gray-400 mt-2">{users.length}</p>
        </div>
        <div className="bg-primary-foreground p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold">Active Chats</h2>
          <p className="text-gray-400 mt-2">12</p>
        </div>
        <div className="bg-primary-foreground p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold">Online Now</h2>
          <p className="text-gray-400 mt-2">{users.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
