import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        `https://chat-app-server-8ec3.onrender.com/api/auth/signup`,
        {
          username,
          password,
        }
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <Helmet>
        <title>Signup - Chat App</title>
      </Helmet>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSignup();
            }
          }}
        />
        <Button onClick={handleSignup} className="mt-4 w-full">
          Signup
        </Button>
      </CardContent>
    </Card>
  );
};

export default Signup;
