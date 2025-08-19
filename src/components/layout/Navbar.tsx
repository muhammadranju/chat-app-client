// import Logo from "@/components/navbar-components/logo"
import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogInIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/home", label: "Home", active: true },
  { href: "/users", label: "Users" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-white">
      <div className="flex h-16 items-center justify-between gap-4 container mx-auto   ">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavLink
                        to={link.href}
                        className="py-1.5"
                        // active={link.active}
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground font-black hover:text-primary/90 flex items-center gap-2"
            >
              <Logo /> Chatify
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      // active={link.active}
                      to={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 px-1.5 font-medium"
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {!token ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handelLogout}
                variant={"destructive"}
                className="cursor-pointer"
              >
                <LogInIcon />
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
