import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/base_url";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `https://chat-app-server-8ec3.onrender.com/api/auth/login`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home"); // Changed to home for user selection
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <Helmet>
        <title>Login - Chat App</title>
      </Helmet>

      <CardHeader>
        <CardTitle>Login</CardTitle>
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
              handleLogin();
            }
          }}
        />
        <Button type="submit" onClick={handleLogin} className="mt-4 w-full">
          Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;
