import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/base_url";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.error("You can't access this page while you are logged in");
      navigate("/users");
    }
  });

  const handleSignup = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/signup`, {
        username,
        password,
      });
      toast.success("Signup Successful");
      navigate("/login");
    } catch (err) {
      toast.error("Signup Failed");
      console.error(err);
    }
  };

  return (
    <Card className="w-[380px] mx-auto mt-44">
      <Helmet>
        <title>Signup - Chat App</title>
      </Helmet>
      <div className="flex items-center flex-col justify-center gap-2">
        <Logo />
        <CardTitle>Signup to Chat App</CardTitle>
      </div>
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
        <Button onClick={handleSignup} className="mt-4 w-full cursor-pointer">
          Signup
          <FaSignInAlt />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Signup;
