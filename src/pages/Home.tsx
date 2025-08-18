import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/base_url";

interface User {
  _id: string;
  username: string;
}

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
      .get(`${BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [navigate]);

  return (
    <Card className="w-[400px] mx-auto mt-20">
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
            <span>{user.username}</span>
            <Button className="ml-auto">Chat</Button>
          </div>
        ))}
        {users.length === 0 && <p>No other users available. Invite friends!</p>}
      </CardContent>
    </Card>
  );
};

export default Home;
