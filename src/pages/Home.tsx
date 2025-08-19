import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`https://chat-app-server-8ec3.onrender.com/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [navigate]);

  return (
    <Card className="w-[400px] mx-auto mt-20">
      <Helmet>
        <title>Home - Chat App</title>
      </Helmet>
      <CardHeader>
        <CardTitle>Select a User to Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => navigate(`/chat/${user._id}`)}
          >
            <Avatar className="mr-2">
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <span>Chat with: {user.username}</span>
            <Button className="ml-auto cursor-pointer">Chat Now</Button>
          </div>
        ))}
        {users.length === 0 && <p>No other users available. Invite friends!</p>}
      </CardContent>
    </Card>
  );
};

export default Home;
