import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/base_url";
import axios from "axios";
import { LogInIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get desired route or fallback to /users
  const from = location.state?.from?.pathname || "/users";
  console.log(from);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toast.error("You can't access this page while you are logged in");
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login Successful");

      // ✅ Navigate to desired route
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login Failed");
      console.error(err);
    }
  };

  return (
    <Card className="w-[380px] mx-auto mt-44">
      <Helmet>
        <title>Login - Chat App</title>
      </Helmet>

      <div className="flex items-center flex-col justify-center gap-2">
        <Logo />
        <CardTitle>Login to Chat App</CardTitle>
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
              handleLogin();
            }
          }}
        />
        <Button
          type="submit"
          onClick={handleLogin}
          className="mt-4 w-full cursor-pointer"
        >
          Login <LogInIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;
